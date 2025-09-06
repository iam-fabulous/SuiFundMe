import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

const client = new SuiClient({ url: getFullnodeUrl("testnet") });

export type ChainProject = {
  id: string;
  name: string;
  imageUrl: string;
  funded: number;
  daysLeft: number;
  description: string;
  creator: string;
  goalAmount: number;
  raisedAmount: number;
};

// Mock detailed projects
const mockProjects: Record<string, ChainProject> = {
  "1": {
    id: "1",
    name: "EcoTech Solutions: Sustainable Energy for All",
    imageUrl: "/images/image-1.jpg",
    funded: 75,
    daysLeft: 25,
    description:
      "A project dedicated to bringing sustainable and affordable energy solutions to underserved communities.",
    creator: "0xEcoCreator",
    goalAmount: 100000,
    raisedAmount: 75000,
  },
  "2": {
    id: "2",
    name: "Harmonia: A Symphony of Unity",
    imageUrl: "/images/image-2.jpg",
    funded: 60,
    daysLeft: 15,
    description:
      "An initiative to unite musicians across cultures for collaborative symphonies.",
    creator: "0xMusicLover",
    goalAmount: 50000,
    raisedAmount: 30000,
  },
  "3": {
    id: "3",
    name: "PixelQuest: The RPG Revolution",
    imageUrl: "/images/image-1.jpg",
    funded: 90,
    daysLeft: 30,
    description:
      "Next-gen role-playing adventure game with pixel art aesthetics and blockchain-backed ownership.",
    creator: "0xGameDev",
    goalAmount: 200000,
    raisedAmount: 180000,
  },
  "4": {
    id: "4",
    name: "PixelQuest: The RPG Revolution",
    imageUrl: "/images/image-2.jpg",
    funded: 10,
    daysLeft: 30,
    description:
      "Early-stage version of PixelQuest for community testing and feedback.",
    creator: "0xGameDev",
    goalAmount: 50000,
    raisedAmount: 5000,
  },
};

// Fetch all projects (chain first, fallback to mocks)
export async function fetchProjectsFromChain(): Promise<ChainProject[]> {
  try {
    console.log("🔗 Fetching projects from Sui...");

    const objs = await client.getOwnedObjects({
      owner: "0xYourPublisherAddr", // TODO: replace with your publisher object address
      options: { showContent: true },
    });

    const projects = objs.data.map((obj: any, idx: number) => {
      const content = obj.data?.content;
      const fields = content?.fields ?? {};

      return {
        id: obj.data?.objectId ?? `chain-${idx}`,
        name: fields?.name ?? "Unnamed Project",
        imageUrl: fields?.image_url ?? "/images/project-placeholder.jpg",
        funded: Number(fields?.funded_percent ?? 0),
        daysLeft: Number(fields?.days_left ?? 0),
        description: fields?.description ?? "No description available",
        creator: fields?.creator ?? "Unknown",
        goalAmount: Number(fields?.goal_amount ?? 0),
        raisedAmount: Number(fields?.raised_amount ?? 0),
      };
    });

    return [...projects, ...Object.values(mockProjects)];
  } catch (err) {
    console.error("❌ Error fetching from Sui, using mocks:", err);
    return Object.values(mockProjects);
  }
}

// Fetch single project (by ID, with fallback)
export async function fetchProjectById(
  projectId: string
): Promise<ChainProject | null> {
  try {
    console.log(`🔗 Fetching project ${projectId} from Sui...`);

    const obj = await client.getObject({
      id: projectId,
      options: { showContent: true },
    });

    const content = obj.data?.content;
    if (content?.dataType === "moveObject") {
      const fields = content.fields;

      return {
        id: obj.data?.objectId ?? projectId,
        name: (fields as any).name ?? "Unnamed Project",
        imageUrl: (fields as any).image_url ?? "/images/project-placeholder.jpg",
        funded: Number((fields as any).funded_percent ?? 0),
        daysLeft: Number((fields as any).days_left ?? 0),
        description: (fields as any).description ?? "No description available",
        creator: (fields as any).creator ?? "Unknown",
        goalAmount: Number((fields as any).goal_amount ?? 0),
        raisedAmount: Number((fields as any).raised_amount ?? 0),
      };
    }

    return mockProjects[projectId] ?? null;
  } catch (err) {
    console.error(`❌ Error fetching project ${projectId}:`, err);
    return mockProjects[projectId] ?? null;
  }
}

export async function pledgeToProject(
  projectId: string,
  amount: number
): Promise<{ success: boolean; txDigest?: string }> {
  console.log(`🚀 Attempting to pledge ${amount} SUI to project ${projectId}`);

  try {
    // TODO: Replace with your actual Move call
    // Example with transaction builder (when ready):
    //
    // const tx = new Transaction();
    // tx.moveCall({
    //   target: "0xYourPackage::crowdfund::pledge",
    //   arguments: [tx.pure(projectId), tx.pure(amount)],
    // });
    // const result = await client.signAndExecuteTransaction({ transaction: tx });
    // return { success: true, txDigest: result.digest };

    // For now, return a mock success
    return {
      success: true,
      txDigest: "0xMockTxDigest",
    };
  } catch (err) {
    console.error(`❌ Failed to pledge to project ${projectId}:`, err);
    return { success: false };
  }
}
