# **Sui FundMe: Core Technology Stack**

Sui FundMe is a **decentralised crowdfunding platform built on the Sui blockchain**. Its primary goal is to replicate and enhance the "all-or-nothing" model of platforms like Kickstarter, but with the **transparency, trustlessness, and borderless nature of Web3**, especially for creators in Africa. The technology stack is carefully chosen to support this vision, focusing on efficiency, security, and user experience.

Here's an explanation of each key technology:

1.  **Sui Blockchain**
    *   **Role**: The Sui Blockchain is the **fundamental technology** and serves as the **main database/storage** for Sui FundMe. It is the backbone for all on-chain operations.
    *   **Explanation**: Sui FundMe leverages Sui to ensure **on-chain transparency** for all pledges, milestones, and fund distribution, building greater trust between creators and backers. It provides a **borderless platform** for creators, particularly in Africa, to access funding without geographical limitations. Sui is chosen for its **parallel execution model**, which facilitates **fast transactions** and contributes to its **scalability**. Its **object-centric model** is particularly advantageous for managing distinct digital assets, such as **NFTs for rewards** and various project campaign components. The network's **low fees** make micro-pledges viable and cost-effective, broadening global participation, and the Sui network handles payment processing with lower costs compared to traditional third-party processors. Critical project information, pledges, and transaction records are stored directly on the Sui blockchain.

2.  **Sui Move**
    *   **Role**: **Move is Sui's native smart contract programming language** and is used for writing all **smart contracts** that govern the platform's logic.
    *   **Explanation**: Move is designed for safe and expressive asset management, offering strong static guarantees to prevent common blockchain vulnerabilities. It is crucial for implementing the core logic of Sui FundMe, including handling pledges, goal tracking, refunds, and reward distribution entirely on Sui smart contracts.

3.  **Next.js**
    *   **Role**: **Next.js is used for the front-end** development of the Sui FundMe web application.
    *   **Explanation**: It provides a robust framework for building modern, responsive web applications, aiming for an intuitive user interface and a smooth user experience.

4.  **Sui-Compatible Wallets (Slush)**
    *   **Role**: These wallet is essential for users to **connect to the platform**, manage their funds, and interact with smart contracts.
    *   **Explanation**: For both creators and backers, the process of using Sui FundMe begins with **connecting a wallet**. Wallets provide seamless integration for backers to **pledge SUI tokens** and receive rewards like NFTs. Wallets are a crucial component in the high-level architecture for backers, facilitating interaction with the frontend and smart contracts.

5.  **Sui dApp Kit (sui dapkit)**
    *   **Role**: The **Sui dApp Kit is specifically used to connect wallets** to the Sui FundMe application.
    *   **Explanation**: It streamlines the integration process, allowing the frontend to communicate effectively with various Sui-compatible wallets.

6.  **Walrus**
    *   **Role**: **Walrus is used for media storage**.
    *   **Explanation**: This technology handles the storage of project visuals and videos uploaded by creators. In the high-level architecture for creators, after creating a project, creators "Upload a media" which interacts with Walrus.

7.  **Smart Contracts (Campaign, Pledge, and Reward Contracts)**
    *   **Role**: These are the programmatic agreements written in Sui Move that **automate the core functionalities and rules** of the crowdfunding platform.
    *   **Explanation**: Project-specific smart contracts are **automatically deployed** upon campaign launch. They are central to the "all-or-nothing" funding model, ensuring that funds are only collected if a project successfully meets its goal.
        *   **Campaign Contract**: This contract **manages the creation of a project**, including setting a funding goal and deadline, storing the project description, and tracking its state (e.g., Active, Successful, Failed). It implements the crucial **"all-or-nothing" logic**, where the project state transitions to "Successful" only if the goal is met by the deadline.
        *   **Pledge Contract**: This contract **handles user pledges**, allowing backers to pledge SUI tokens to a specific project. It includes logic to **lock funds** (or process them conditionally) such that they are only transferred to the creator if the project reaches its funding goal. If the goal is not met, the funds are not collected and should be available for refund or remain in the backer's wallet.
        *   **Reward Contract**: This contract **facilitates the creation and distribution of various reward types**, including **NFTs**. For the initial demo, a basic reward mechanism could involve a simple NFT minting function tied to a specific pledge tier or as a "Proof of Support".

---