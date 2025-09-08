#[test_only]
module suifundme_smartcontract::suifundme_smartcontract_tests {
    use sui::test_scenario as ts;
    use sui::test_utils::assert_eq;
    use sui::coin;
    use sui::sui::SUI;
    use sui::clock;
    use std::vector;
    use suifundme_smartcontract::suifundme_smartcontract::{Self, Campaign, CreatorCap, Contribution};
    use std::string;

    const CREATOR: address = @0x1;
    const DONOR: address = @0x2;
    const GOAL: u64 = 1000000000; // 1 SUI
    const DONATION: u64 = 500000000; // 0.5 SUI
    const DURATION: u64 = 10000; // 10 seconds in ms
    const TIER_MIN: u64 = 100000000; // 0.1 SUI

    // Helper to create dummy tiers for tests
    fun dummy_tiers(): (vector<vector<u8>>, vector<u64>, vector<vector<u8>>) {
        let names = vector[b"Wood", b"Bronze"];
        let mins = vector[TIER_MIN, 500000000];
        let descs = vector[b"Basic reward", b"Mid reward"];
        (names, mins, descs)
    }

    #[test]
    fun test_create_campaign() {
        let mut scenario = ts::begin(CREATOR);
        let clock = clock::create_for_testing(ts::ctx(&mut scenario));
        let (tier_names, tier_mins, tier_descs) = dummy_tiers();

        suifundme_smartcontract::create_campaign(
            GOAL,
            DURATION,
            b"Test description",
            b"walrus_blob_id_hex",
            tier_names,
            tier_mins,
            tier_descs,
            &clock,
            ts::ctx(&mut scenario)
        );

        ts::next_tx(&mut scenario, CREATOR);
        let cap = ts::take_from_sender<CreatorCap>(&scenario);
        let campaign = ts::take_shared<Campaign>(&scenario);

        assert_eq(suifundme_smartcontract::campaign_id(&cap), sui::object::id(&campaign));
        assert_eq(*suifundme_smartcontract::campaign_description(&campaign), string::utf8(b"Test description"));
        assert_eq(*suifundme_smartcontract::campaign_media_blob_id(&campaign), string::utf8(b"walrus_blob_id_hex"));
        assert_eq(suifundme_smartcontract::campaign_tier_count(&campaign), 2);

        ts::return_to_sender(&scenario, cap);
        ts::return_shared(campaign);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }

    #[test]
    fun test_donate() {
        let mut scenario = ts::begin(CREATOR);
        let clock = clock::create_for_testing(ts::ctx(&mut scenario));
        let (tier_names, tier_mins, tier_descs) = dummy_tiers();

        suifundme_smartcontract::create_campaign(
            GOAL,
            DURATION,
            b"Test desc",
            b"blob_id",
            tier_names,
            tier_mins,
            tier_descs,
            &clock,
            ts::ctx(&mut scenario)
        );

        ts::next_tx(&mut scenario, DONOR);
        let mut campaign = ts::take_shared<Campaign>(&scenario);
        let payment = coin::mint_for_testing<SUI>(DONATION, ts::ctx(&mut scenario));

        suifundme_smartcontract::donate(&mut campaign, payment, 1, &clock, ts::ctx(&mut scenario)); // tier_index 1 (Bronze)

        ts::next_tx(&mut scenario, DONOR);
        let contrib = ts::take_from_sender<Contribution>(&scenario);
        assert_eq(suifundme_smartcontract::contribution_amount(&contrib), DONATION);
        assert_eq(suifundme_smartcontract::contribution_tier_index(&contrib), 1);

        assert_eq(suifundme_smartcontract::campaign_balance(&campaign), DONATION);

        ts::return_shared(campaign);
        ts::return_to_sender(&scenario, contrib);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }

    #[test]
    #[expected_failure(abort_code = 8)] // EInsufficientAmount
    fun test_donate_fail_insufficient_for_tier() {
        let mut scenario = ts::begin(CREATOR);
        let clock = clock::create_for_testing(ts::ctx(&mut scenario));
        let (tier_names, tier_mins, tier_descs) = dummy_tiers();

        suifundme_smartcontract::create_campaign(
            GOAL,
            DURATION,
            b"Test desc",
            b"blob_id",
            tier_names,
            tier_mins,
            tier_descs,
            &clock,
            ts::ctx(&mut scenario)
        );

        ts::next_tx(&mut scenario, DONOR);
        let mut campaign = ts::take_shared<Campaign>(&scenario);
        let payment = coin::mint_for_testing<SUI>(TIER_MIN - 1, ts::ctx(&mut scenario));

        suifundme_smartcontract::donate(&mut campaign, payment, 0, &clock, ts::ctx(&mut scenario));

        ts::return_shared(campaign);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }

    // Remaining tests (claim_funds_fail, claim_funds_success, refund, cancel_campaign) are unchanged but adapted for new create_campaign params
    #[test]
    #[expected_failure(abort_code = 3)]
    fun test_claim_funds_fail_goal_not_met() {
        let mut scenario = ts::begin(CREATOR);
        let mut clock = clock::create_for_testing(ts::ctx(&mut scenario));
        let (tier_names, tier_mins, tier_descs) = dummy_tiers();

        suifundme_smartcontract::create_campaign(
            GOAL,
            DURATION,
            b"Test desc",
            b"blob_id",
            tier_names,
            tier_mins,
            tier_descs,
            &clock,
            ts::ctx(&mut scenario)
        );

        ts::next_tx(&mut scenario, CREATOR);
        let cap = ts::take_from_sender<CreatorCap>(&scenario);
        let mut campaign = ts::take_shared<Campaign>(&scenario);

        clock::increment_for_testing(&mut clock, DURATION + 1);

        suifundme_smartcontract::claim_funds(cap, &mut campaign, &clock, ts::ctx(&mut scenario));

        ts::return_shared(campaign);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }

    #[test]
    fun test_claim_funds_success() {
        let mut scenario = ts::begin(CREATOR);
        let mut clock = clock::create_for_testing(ts::ctx(&mut scenario));
        let (tier_names, tier_mins, tier_descs) = dummy_tiers();

        suifundme_smartcontract::create_campaign(
            GOAL,
            DURATION,
            b"Test desc",
            b"blob_id",
            tier_names,
            tier_mins,
            tier_descs,
            &clock,
            ts::ctx(&mut scenario)
        );

        ts::next_tx(&mut scenario, DONOR);
        let mut campaign = ts::take_shared<Campaign>(&scenario);
        let payment = coin::mint_for_testing<SUI>(GOAL, ts::ctx(&mut scenario));
        suifundme_smartcontract::donate(&mut campaign, payment, 0, &clock, ts::ctx(&mut scenario));

        ts::next_tx(&mut scenario, CREATOR);
        let cap = ts::take_from_sender<CreatorCap>(&scenario);

        clock::increment_for_testing(&mut clock, DURATION + 1);

        suifundme_smartcontract::claim_funds(cap, &mut campaign, &clock, ts::ctx(&mut scenario));

        ts::next_tx(&mut scenario, CREATOR);
        let received = ts::take_from_sender<coin::Coin<SUI>>(&scenario);
        assert_eq(coin::value(&received), GOAL);

        assert!(!suifundme_smartcontract::campaign_active(&campaign), 0);
        assert_eq(suifundme_smartcontract::campaign_balance(&campaign), 0);

        ts::return_shared(campaign);
        ts::return_to_sender(&scenario, received);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }

    #[test]
    fun test_refund() {
        let mut scenario = ts::begin(CREATOR);
        let mut clock = clock::create_for_testing(ts::ctx(&mut scenario));
        let (tier_names, tier_mins, tier_descs) = dummy_tiers();

        suifundme_smartcontract::create_campaign(
            GOAL,
            DURATION,
            b"Test desc",
            b"blob_id",
            tier_names,
            tier_mins,
            tier_descs,
            &clock,
            ts::ctx(&mut scenario)
        );

        ts::next_tx(&mut scenario, DONOR);
        let mut campaign = ts::take_shared<Campaign>(&scenario);
        let payment = coin::mint_for_testing<SUI>(DONATION, ts::ctx(&mut scenario));
        suifundme_smartcontract::donate(&mut campaign, payment, 0, &clock, ts::ctx(&mut scenario));

        ts::next_tx(&mut scenario, DONOR);
        let contrib = ts::take_from_sender<Contribution>(&scenario);

        clock::increment_for_testing(&mut clock, DURATION + 1);

        ts::next_tx(&mut scenario, DONOR);
        suifundme_smartcontract::refund(&mut campaign, contrib, &clock, ts::ctx(&mut scenario));

        ts::next_tx(&mut scenario, DONOR);
        let refunded = ts::take_from_sender<coin::Coin<SUI>>(&scenario);
        assert_eq(coin::value(&refunded), DONATION);

        assert_eq(suifundme_smartcontract::campaign_balance(&campaign), 0);

        ts::return_shared(campaign);
        ts::return_to_sender(&scenario, refunded);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }

    #[test]
    fun test_cancel_campaign() {
        let mut scenario = ts::begin(CREATOR);
        let clock = clock::create_for_testing(ts::ctx(&mut scenario));
        let (tier_names, tier_mins, tier_descs) = dummy_tiers();

        suifundme_smartcontract::create_campaign(
            GOAL,
            DURATION,
            b"Test desc",
            b"blob_id",
            tier_names,
            tier_mins,
            tier_descs,
            &clock,
            ts::ctx(&mut scenario)
        );

        ts::next_tx(&mut scenario, CREATOR);
        let cap = ts::take_from_sender<CreatorCap>(&scenario);
        let mut campaign = ts::take_shared<Campaign>(&scenario);

        suifundme_smartcontract::cancel_campaign(cap, &mut campaign, ts::ctx(&mut scenario));

        assert!(!suifundme_smartcontract::campaign_active(&campaign), 0);

        ts::return_shared(campaign);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }
}
