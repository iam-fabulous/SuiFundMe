#[test_only]
module suifundme::suifundme_tests {
    use sui::test_scenario as ts;
    use sui::test_utils::assert_eq;
    use sui::coin;
    use sui::sui::SUI;
    use sui::clock;
    use suifundme::suifundme::{Self, Campaign, CreatorCap, Contribution};

    const CREATOR: address = @0x1;
    const DONOR: address = @0x2;
    const GOAL: u64 = 1000000000; // 1 SUI
    const DONATION: u64 = 500000000; // 0.5 SUI
    const DURATION: u64 = 10000; // 10 seconds in ms


    #[test]
    fun test_create_campaign() {
        let mut scenario = ts::begin(CREATOR);
        let clock = clock::create_for_testing(ts::ctx(&mut scenario));

        suifundme::create_campaign(GOAL, DURATION, &clock, ts::ctx(&mut scenario));

        ts::next_tx(&mut scenario, CREATOR);
        let cap = ts::take_from_sender<CreatorCap>(&scenario);
        let campaign = ts::take_shared<Campaign>(&scenario);

        assert_eq(suifundme::campaign_id(&cap), sui::object::id(&campaign));

        ts::return_to_sender(&scenario, cap);
        ts::return_shared(campaign);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }

    #[test]
    fun test_donate() {
        let mut scenario = ts::begin(CREATOR);
        let clock = clock::create_for_testing(ts::ctx(&mut scenario));

        suifundme::create_campaign(GOAL, DURATION, &clock, ts::ctx(&mut scenario));

        ts::next_tx(&mut scenario, DONOR);
        let mut campaign = ts::take_shared<Campaign>(&scenario);
        let payment = coin::mint_for_testing<SUI>(DONATION, ts::ctx(&mut scenario));

        suifundme::donate(&mut campaign, payment, &clock, ts::ctx(&mut scenario));

        // Switch to DONOR's context to retrieve Contribution
        ts::next_tx(&mut scenario, DONOR);
        let contrib = ts::take_from_sender<Contribution>(&scenario);
        assert_eq(suifundme::contribution_amount(&contrib), DONATION);

        assert_eq(suifundme::campaign_balance(&campaign), DONATION);

        ts::return_shared(campaign);
        ts::return_to_sender(&scenario, contrib);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }


    #[test]
    #[expected_failure(abort_code = 3)]
    fun test_claim_funds_fail_goal_not_met() {
        let mut scenario = ts::begin(CREATOR);
        let mut clock = clock::create_for_testing(ts::ctx(&mut scenario));

        suifundme::create_campaign(GOAL, DURATION, &clock, ts::ctx(&mut scenario));

        ts::next_tx(&mut scenario, CREATOR);
        let cap = ts::take_from_sender<CreatorCap>(&scenario);
        let mut campaign = ts::take_shared<Campaign>(&scenario);

        clock::increment_for_testing(&mut clock, DURATION + 1);

        suifundme::claim_funds(cap, &mut campaign, &clock, ts::ctx(&mut scenario));

        // Should fail, so no return needed
        ts::return_shared(campaign);
        clock::destroy_for_testing(clock);
        ts::end(scenario);
    }
