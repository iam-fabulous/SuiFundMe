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

    // Error codes
    const ECampaignInactive: u64 = 0;
    const EDeadlineNotPassed: u64 = 1;
    const EDeadlinePassed: u64 = 2;
    const EGoalNotMet: u64 = 3;
    const EGoalMet: u64 = 4;
    const EInvalidCap: u64 = 5;
    const EInvalidContribution: u64 = 6;

    // Structs
    public struct Campaign has key {
        id: UID,
        creator: address,
        goal: u64, // in MIST (10^-9 SUI)
        balance: Balance<SUI>,
        end_time: u64, // timestamp in ms
        active: bool,
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

    // Events
    public struct CampaignCreated has copy, drop {
        campaign_id: ID,
        creator: address,
        goal: u64,
        end_time: u64,
    }

    public struct Donated has copy, drop {
        campaign_id: ID,
        donor: address,
        amount: u64,
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


    // Functions
    public entry fun create_campaign(goal: u64, duration_ms: u64, clock: &Clock, ctx: &mut TxContext) {
        let uid = object::new(ctx);
        let campaign_id = object::uid_to_inner(&uid);
        let creator = tx_context::sender(ctx);
        let end_time = clock::timestamp_ms(clock) + duration_ms;

        let campaign = Campaign {
            id: uid,
            creator,
            goal,
            balance: balance::zero(),
            end_time,
            active: true,
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
        });
    }



}
