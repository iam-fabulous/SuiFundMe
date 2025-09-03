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
