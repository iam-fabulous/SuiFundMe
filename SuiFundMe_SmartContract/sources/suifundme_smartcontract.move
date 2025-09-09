#[allow(duplicate_alias)]

module suifundme_smartcontract::suifundme_smartcontract {
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::clock::{Self, Clock};
    use sui::event;
    use std::string::{Self, String};
    use std::vector;

    // Error codes
    const ECampaignInactive: u64 = 0;
    const EDeadlineNotPassed: u64 = 1;
    const EDeadlinePassed: u64 = 2;
    const EGoalNotMet: u64 = 3;
    const EGoalMet: u64 = 4;
    const EInvalidCap: u64 = 5;
    const EInvalidContribution: u64 = 6;
    const EInvalidTier: u64 = 7;
    const EInsufficientAmount: u64 = 8;
    const ETierLengthsMismatch: u64 = 9;

    // Structs
    public struct Campaign has key {
        id: UID,
        creator: address,
        goal: u64, // in MIST (10^-9 SUI)
        balance: Balance<SUI>,
        end_time: u64, // timestamp in ms
        active: bool,
        description: String,
        media_blob_id: String,
        tiers: vector<RewardTier>,
    }

    public struct CreatorCap has key {
        id: UID,
        campaign_id: ID,
    }

    public struct Contribution has key {
        id: UID,
        campaign_id: ID,
        amount: u64,
    }

    public struct RewardTier has store {
        name: String,
        min_amount: u64,
        description: String,
    }


    // Events
    public struct CampaignCreated has copy, drop {
        campaign_id: ID,
        creator: address,
        goal: u64,
        end_time: u64,
        description: String,
        media_blob_id: String,
        tier_count: u64,
    }

    public struct Donated has copy, drop {
        campaign_id: ID,
        donor: address,
        amount: u64,
        tier_index: u64,
    }

    public struct FundsClaimed has copy, drop {
        campaign_id: ID,
        amount: u64,
    }

    public struct Refunded has copy, drop {
        campaign_id: ID,
        contributor: address,
        amount: u64,
    }

    public struct CampaignCancelled has copy, drop {
        campaign_id: ID,
    }


    // Public getter functions for testing
    public fun campaign_id(cap: &CreatorCap): ID {
        cap.campaign_id
    }

    public fun contribution_amount(contrib: &Contribution): u64 {
        contrib.amount
    }

    public fun campaign_balance(campaign: &Campaign): u64 {
        balance::value(&campaign.balance)
    }

    public fun campaign_active(campaign: &Campaign): bool {
        campaign.active
    }

    public fun campaign_description(campaign: &Campaign): &String {
        &campaign.description
    }

    public fun campaign_media_blob_id(campaign: &Campaign): &String {
        &campaign.media_blob_id
    }

    public fun campaign_tier_count(campaign: &Campaign): u64 {
        vector::length(&campaign.tiers)
    }

     public fun get_reward_tier(campaign: &Campaign, index: u64): (&String, u64, &String) {
        let tier = vector::borrow(&campaign.tiers, index);
        (&tier.name, tier.min_amount, &tier.description)
    }


    // Functions
    public entry fun create_campaign(
        goal: u64,
        duration_ms: u64,
        description_bytes: vector<u8>,
        media_blob_id_bytes: vector<u8>,
        tier_names: vector<vector<u8>>,
        tier_min_amounts: vector<u64>,
        tier_descriptions: vector<vector<u8>>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let uid = object::new(ctx);
        let campaign_id = object::uid_to_inner(&uid);
        let creator = tx_context::sender(ctx);
        let end_time = clock::timestamp_ms(clock) + duration_ms;

        let description = string::utf8(description_bytes);
        let media_blob_id = string::utf8(media_blob_id_bytes);

        // Validate tier vectors have same length
        let len = vector::length(&tier_names);
        assert!(len == vector::length(&tier_min_amounts) && len == vector::length(&tier_descriptions), ETierLengthsMismatch);

        let mut tiers = vector::empty<RewardTier>();
        let mut i = 0;
        while (i < len) {
            vector::push_back(&mut tiers, RewardTier {
                name: string::utf8(*vector::borrow(&tier_names, i)),
                min_amount: *vector::borrow(&tier_min_amounts, i),
                description: string::utf8(*vector::borrow(&tier_descriptions, i)),
            });
            i = i + 1;
        };

       let campaign = Campaign {
            id: uid,
            creator,
            goal,
            balance: balance::zero(),
            end_time,
            active: true,
            description,
            media_blob_id,
            tiers,
        };

        transfer::share_object(campaign);

        transfer::transfer(CreatorCap {
            id: object::new(ctx),
            campaign_id,
        }, creator);

        event::emit(CampaignCreated {
            campaign_id,
            creator,
            goal,
            end_time,
            description,
            media_blob_id,
            tier_count: len,
        });
    }



    public entry fun donate(campaign: &mut Campaign, payment: Coin<SUI>, clock: &Clock, ctx: &mut TxContext) {
        assert!(campaign.active, ECampaignInactive);
        assert!(clock::timestamp_ms(clock) < campaign.end_time, EDeadlinePassed);

        let amount = coin::value(&payment);
        let bal = coin::into_balance(payment);
        balance::join(&mut campaign.balance, bal);

        let donor = tx_context::sender(ctx);
        transfer::transfer(Contribution {
            id: object::new(ctx),
            campaign_id: object::id(campaign),
            amount,
        }, donor);

        event::emit(Donated {
            campaign_id: object::id(campaign),
            donor,
            amount,
        });
    }


    public entry fun claim_funds(cap: CreatorCap, campaign: &mut Campaign, clock: &Clock, ctx: &mut TxContext) {
        assert!(cap.campaign_id == object::id(campaign), EInvalidCap);
        assert!(clock::timestamp_ms(clock) > campaign.end_time, EDeadlineNotPassed);
        assert!(balance::value(&campaign.balance) >= campaign.goal, EGoalNotMet);

        let amount = balance::value(&campaign.balance);
        let coin = coin::take(&mut campaign.balance, amount, ctx);
        transfer::public_transfer(coin, campaign.creator);

        campaign.active = false;

        let CreatorCap { id, campaign_id: _ } = cap;
        object::delete(id);

        event::emit(FundsClaimed {
            campaign_id: object::id(campaign),
            amount,
        });
    }


    public entry fun refund(campaign: &mut Campaign, contrib: Contribution, clock: &Clock, ctx: &mut TxContext) {
        assert!(contrib.campaign_id == object::id(campaign), EInvalidContribution);
        assert!(clock::timestamp_ms(clock) > campaign.end_time, EDeadlineNotPassed);
        assert!(balance::value(&campaign.balance) < campaign.goal, EGoalMet);

        let amount = contrib.amount;
        let coin = coin::take(&mut campaign.balance, amount, ctx);
        let contributor = tx_context::sender(ctx);
        transfer::public_transfer(coin, contributor);

        let Contribution { id, campaign_id: _, amount: _ } = contrib;
        object::delete(id);

        event::emit(Refunded {
            campaign_id: object::id(campaign),
            contributor,
            amount,
        });
    }


    public entry fun cancel_campaign(cap: CreatorCap, campaign: &mut Campaign, _ctx: &mut TxContext) {
        assert!(cap.campaign_id == object::id(campaign), EInvalidCap);
        assert!(campaign.active, ECampaignInactive);

        campaign.active = false;

        let CreatorCap { id, campaign_id: _ } = cap;
        object::delete(id);

        event::emit(CampaignCancelled {
            campaign_id: object::id(campaign),
        });
    }
}





