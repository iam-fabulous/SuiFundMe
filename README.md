# SuiFundMe

Product Requirements Document (PRD): Sui FundMe- Decentralised Crowdfunding on Sui
Project Name: Sui FundMe
Version: 1.0 
Date: 26 October 2023 
Author: Timothy Idowu

1. Executive Summary
    Sui FundMe is envisioned as a decentralised crowdfunding platform built on the Sui blockchain, aiming to replicate and enhance the "all-or-nothing" model of traditional platforms like Kickstarter, but with the transparency, trustlessness, and borderless nature of Web3. This platform will provide a launchpad for creative dreams, particularly targeting creators in Africa who often face challenges accessing global funding avenues. By leveraging Sui's unique capabilities, SuiLaunch will empower creators to fund their projects directly from a global community of backers using SUI tokens or other crypto assets, with every transaction governed by smart contracts.

2. Problem Statement
    - Traditional crowdfunding platforms, while effective, can present limitations for creators, particularly in regions like Africa:
    - Geographical Restrictions: Many global funding platforms have strict country eligibility requirements, excluding creators from various regions, including Nigeria, from launching projects.
    - Centralised Control & Fees: Traditional platforms operate as intermediaries, involving platform and payment processing fees that can reduce the funds reaching creators.
    - Lack of Transparency: While some platforms offer communication tools, the underlying financial flows are often opaque to backers.
    - Funding Access: Creators often struggle to secure funding without relying on loans or traditional investors.

3. Vision & Goals
    Vision: To be the leading Web3-native, decentralised crowdfunding platform that empowers creators globally, particularly across Africa, by fostering a transparent, community-powered engine for turning imagination into reality.

    Goals:
        - Democratise Access: Provide a borderless platform for creators, especially in Africa, to access funding without geographical limitations or complex financial intermediaries.
        - Enhance Transparency & Trust: Utilise blockchain technology and smart contracts to ensure on-chain transparency for all pledges, milestones, and fund distribution, building greater trust between creators and backers.
        - Empower Creators: Offer a robust set of tools for creators to launch, promote, and manage their projects with flexibility and direct community engagement.
        - Protect Backers: Implement the all-or-nothing funding model to ensure backers are only charged if a project successfully meets its funding goal, protecting them from projects with insufficient funds.
        - Leverage Web3 Advantages: Fully utilise Sui's speed, scalability, low fees, and object-centric model for efficient and cost-effective crowdfunding, including NFT-based rewards.


4. Target Audience
    - 4.1. Creators:
        - Creative Professionals: Individuals and teams focused on projects in art, music, film, games, tech, design, books, comics, and photography.
        - Emerging Market Creators: A specific focus on creators from African nations who are currently underserved by traditional global crowdfunding platforms.
        - Web3-Native Artists: Creators interested in leveraging blockchain for unique reward mechanisms (e.g., NFTs) and direct community ownership.
        - Individuals seeking funding without the need for loans or investors.

    4.2. Backers:
        - Community Supporters: Individuals who believe in supporting ideas and want to be part of the creative journey.
        - Crypto Enthusiasts: Users familiar with and holding SUI tokens or other compatible crypto assets, interested in Web3 innovation.
        - Early Adopters: Those looking to discover and fund innovative projects, potentially gaining exclusive access or unique digital rewards.


5. Key Features

    5.1. Creator Functionality:
        Project Creation Dashboard:
            - Intuitive UI for building campaigns.
            - Ability to set a clear title, detailed description, and compelling visuals/video to showcase the idea.
            - Tools to define a realistic funding goal and a specific deadline for the campaign.
            - Reward Tier Management:
            - Creation of multiple reward tiers with different pledge levels.
            - Support for various incentives, including early access, exclusive merchandise, digital content, and unique NFTs.
        Smart Contract Deployment:
            - Automated deployment of a project-specific smart contract upon campaign launch, handling pledge logic, goal tracking, and fund distribution.
        Campaign Management & Promotion:
            - Tools to share campaigns across social media and other networks.
            - Functionality to post updates and engage directly with backers through comments and announcements.
        Fund Reception & Project Delivery:
            - Automated transfer of SUI funds (minus fees) to the creator's wallet if the funding goal is successfully met.
            - Guidance and tools to assist creators in delivering their projects and fulfilling promised rewards.

    5.2. Backer Functionality:
        Project Discovery:
            - Ability to browse projects by category (e.g., tech, games, music, film, design) and trending status.
            - Search and filtering capabilities.
        Pledge Mechanism:
            - Easy selection of reward tiers and pledging of SUI tokens or stablecoins.
            - Clear communication that funds are only charged if the project reaches its goal (all-or-nothing).
        Transparency & Tracking:
            - On-chain transparency allows backers to verify funds, milestones, and delivery progress.
            - Ability to follow the project's journey through creator updates.
        Reward Reception:
            - Automated distribution of NFTs, token-gated access, or digital collectibles upon project completion and reward fulfillment.
            - NFT Proof of Support immortalises their contribution.
        Wallet Integration:
            - Seamless connection with Sui-compatible wallets (e.g., Slush, Phantom) for pledging and receiving rewards.
    5.3. Core Platform Features:
        - All-or-Nothing Funding Model: Funds are only collected and fees applied if a project successfully meets its funding goal. If not, no money changes hands, and backers are not charged.
        - Smart Contracts: Core logic for pledges, goal tracking, refunds (in case of failure), and reward distribution built entirely on Sui smart contracts.
        - Sui Blockchain Integration: Leverages Sui's parallel execution for fast transactions, object-centric model for managing NFTs and reward tiers, and low fees for global accessibility.
        - Global Reach & Localisation: Designed for borderless access, with potential future localisation for different African regions to improve user experience.


6. Business Model
    Sui FundMe will operate on a success-based revenue model, earning revenue only from successfully funded projects.
        - Platform Fee: A competitive percentage cut (e.g., 5%) of the total funds successfully raised from funded projects.
        - Payment Processing (Sui Network Fees): Transaction fees are handled by the Sui network, offering significantly lower costs compared to traditional third-party payment processors.
        - No Fees for Unfunded Projects: If a project does not meet its funding goal, no money is collected, and SuiFundMe earns nothing, aligning incentives with project success.


7. Technical Considerations
    - Blockchain: Sui Blockchain.
    - Smart Contract Language: Move (Sui's native smart contract language).
    - Core Smart Contracts:
    - Campaign Contract: Manages project creation, goal setting, deadline, and state transitions (e.g., active, successful, failed).
    - Pledge Contract: Handles user pledges, locks funds, and manages refund logic if the goal isn't met.
    - Reward Contract: Facilitates the creation and distribution of various reward types, including NFTs.
    - Frontend: Web application with responsive design, potentially leveraging modern Web3 frameworks.
    - Wallet Integration: Integration with prominent Sui-compatible wallets (e.g., Suiet, Ethos).
    - Security: Rigorous smart contract audits and ongoing security monitoring are paramount to protect funds and user data.


8. Success Metrics
    - Total Funds Raised: Aggregate SUI/crypto value successfully raised across all projects.
    - Number of Successfully Funded Projects: Count of projects that reach 100% or more of their funding goal.
    - Creator Adoption: Number of unique creators launching projects, particularly from target regions like Africa.
    - Backer Engagement: Number of unique backers, average pledge amount, and repeat backing rate.
    - Transaction Volume & Speed: Monitoring the efficiency and cost-effectiveness of on-chain transactions.
    - Community Growth: Size and activity of the SuiLaunch community (e.g., social media, forums).
    - User Feedback: Qualitative feedback from creators and backers regarding ease of use, transparency, and support.


9. Future Considerations & Scope
    - DAO Governance: Implement a decentralised autonomous organisation (DAO) to allow the community to vote on platform upgrades, featured projects, or protocol changes, fostering true decentralisation.
    - Creator Reputation System: Develop an on-chain reputation system to build trust and credibility for creators based on their project history and successful deliveries.
    - Escrow Logic for Milestones: Introduce advanced escrow logic where pledged funds are released to creators in stages upon the achievement of predefined project milestones, further protecting backers and ensuring accountability.
    - Fiat On/Off Ramps: Explore partnerships to facilitate seamless conversion between fiat currencies and SUI tokens, enhancing accessibility for a broader user base.
    - Cross-Chain Compatibility: Investigate possibilities for interoperability with other blockchains to expand the reach and funding options.
    - Creator Handbook & Resources: Develop a comprehensive guide with tips on storytelling, budgeting, and marketing, similar to traditional platforms.


10. Buildathon Execution Plan: From Concept to Demo Day
    Given the 1-week buildathon timeframe, ending next Wednesday (Demo Day), with all smart contracts to be submitted this Thursday.

        10.1. Core Philosophy for the Buildathon
            Prioritise Core Functionality: Focus solely on the essential features that prove the platform's value proposition.
                - "All-or-Nothing" Model First: Ensure the core logic for pledges and goal achievement is robust.
                - On-Chain Transparency: Make sure the critical data for backers is visible on the Sui blockchain.
                - Simplicity: Opt for the simplest implementation of features to meet deadlines.

        10.2. Feature Breakdown and Timeline
            We will divide the buildathon into two main phases, dictated by the smart contract deadline.
                Phase 1: Smart Contract Development & Submission (Today - Thursday) Goal: Deliver a functional set of core smart contracts that handle project creation, pledging, and the "all-or-nothing" funding logic. Submission Deadline: This Thursday.

                Day 1-2 (Today - Thursday Morning): Smart Contract Development
                    - Core Smart Contracts (Mandatory for Thursday Submission):
                    - Campaign Contract: This contract will manage the creation of a project, including setting a funding goal and deadline, storing the project description, and tracking its state (e.g., Active, Successful, Failed). It will also implement the crucial "all-or-nothing" logic, where the project state transitions to Successful only if the goal is met by the deadline.
                    - Pledge Contract: This contract will handle user pledges. It will allow backers to pledge SUI tokens to a specific project. It must include logic to lock funds (or process them conditionally) such that they are only transferred to the creator if the project reaches its funding goal. If the goal is not met, the funds must not be collected and should be available for refund or simply remain in the backer's wallet (depending on the exact implementation, for a buildathon, not collecting them is simplest).
                    - (Stretch/Basic) Reward Contract: For the demo, a very basic reward mechanism could be a simple NFT minting function tied to a specific pledge tier or as a "Proof of Support". This could be a single, generic NFT representing support, rather than complex tiered rewards at this stage. The primary focus for Thursday should be the Campaign and Pledge logic.
                    - Unit Testing: Comprehensive unit tests for all smart contract functions to ensure correct logic and security before submission.

                Thursday Afternoon: Smart Contract Review & Submission
                    - Internal Review: Conduct a quick peer review of the smart contract code.
                    - Final Testing: Execute all unit tests and basic integration tests on a local Sui network.
                    - Submission: Submit the smart contract code as per buildathon guidelines.

            Phase 2: Frontend Integration & Demo Preparation (Friday - Next Wednesday) Goal: Develop a basic web interface that allows users to interact with the deployed smart contracts, showcasing the core crowdfunding flow for Demo Day. Demo Day: Next Wednesday.

                Day 3 (Friday): Frontend Setup & Creator Flow MVP
                    - Frontend Framework Setup: Initialise the web application with a responsive design.
                    - Wallet Integration: Implement seamless connection with Sui-compatible wallets (e.g., Suiet, Ethos).
                    - Project Creation UI: Develop a basic form for creators to create a new project, including inputs for title, description, funding goal, and deadline. This UI will interact directly with the deployed Campaign Contract.
                    - Basic Project Listing: Display newly created projects on a homepage.

                Day 4-5 (Saturday - Sunday): Backer Flow MVP & On-Chain Display
                    - Project Detail Page: Create a page for each project showing its details (title, description, goal, deadline, current funds raised).
                    - Pledge Mechanism UI: Implement the functionality for backers to select a pledge amount (or a basic reward tier) and pledge SUI tokens to a project. This will interact with the Pledge Contract.
                    - Dynamic Funding Status: Visually update the project's progress towards its funding goal in real-time or near real-time, pulling data directly from the blockchain via the Campaign Contract.
                    - On-Chain Transparency Display: Basic links or displays to show transaction hashes or smart contract states, demonstrating on-chain transparency.
                    - (If Basic Reward Contract was built): Basic display of a "Claim NFT" button for a successful project.

                Day 6-7 (Monday - Next Wednesday): Polish, Bug Fixing & Demo Prep
                    - User Experience Refinement: Improve the intuitiveness of the UI for both creators and backers.
                    - Error Handling: Implement basic error messages and user feedback for common interactions (e.g., insufficient funds, wallet not connected).
                    - Cross-Browser Testing: Ensure basic functionality across common web browsers.
                    - Demo Script & Presentation: Prepare a clear, concise script for Demo Day that highlights the core features:
                    - Connecting a wallet.
                    - A creator launching a project.
                    - Backers pledging to the project.
                    - Demonstrating the "all-or-nothing" success (or failure) of a campaign.
                    - Highlighting the on-chain transparency and borderless nature.
                    - Practice Run: Conduct multiple practice runs of the demo to ensure smooth execution.

        10.3. Risks & Mitigation for Buildathon
            - Smart Contract Bugs: Implement thorough unit testing. Focus on core logic for Thursday's submission. Any complex features (e.g., advanced reward types, DAO governance) are deferred to post-buildathon.
            - Time Constraints: Aggressively prioritise MVP features. Any non-essential UI/UX polish, advanced features, or extensive content creation (like a full "Creator Handbook") will be out of scope for the buildathon.
            - Integration Challenges: Use existing Sui SDKs and well-documented wallet integrations. Keep the frontend stack simple.
            - By adhering to this focused plan, we aim to present a compelling demo of SuiLaunch's core value proposition on Demo Day, showcasing the power of decentralised crowdfunding on the Sui blockchain.
