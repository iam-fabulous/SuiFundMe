// src/lib/sui.ts
import { SuiClient, getFullnodeUrl, SuiObjectResponse, SuiParsedData } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { bcs } from '@mysten/sui/bcs';

// import { Signer } from '@mysten/sui.js/cryptography';
// import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';

const client = new SuiClient({ url: getFullnodeUrl("testnet") });
const PROJECT_MOVE_TYPE =
  "0xc01e453d27f18bb7ca4afb033f97cb3dac6eb3fa56c9f78cee56bccc8062efc4::suifundme_smartcontract::Project";

  type SignAndExecuteFn = (args: { transaction: Transaction }) => Promise<{ digest: string }>;
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

export interface SuiObjectField {
  name?: string;
  image_url?: string;
  funded_percent?: number | string;
  days_left?: number | string;
  description?: string;
  creator?: string;
  goal_amount?: number | string;
  raised_amount?: number | string;
}

export interface SuiObjectContent {
  dataType: string;
  fields: SuiObjectField;
}

export interface SuiOwnedObject {
  data?: {
    objectId: string;
    content?: SuiObjectContent;
  };
}

// ---------------- MOCK PROJECTS ----------------
const mockProjects: Record<string, ChainProject> = {
  "1": {
    id: "1",
    name: "EcoTech Solutions: Sustainable Energy for All",
    imageUrl: "/images/image-1.png",
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
    imageUrl: "/images/image-2.png",
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
    imageUrl: "/images/image-1.png",
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
    name: "PixelQuest Early Access",
    imageUrl: "/images/image-2.png",
    funded: 10,
    daysLeft: 30,
    description:
      "Early-stage version of PixelQuest for community testing and feedback.",
    creator: "0xGameDev",
    goalAmount: 50000,
    raisedAmount: 5000,
  },
};

// ---------------- FETCH ALL PROJECTS ----------------
export async function fetchProjectsFromChain(): Promise<ChainProject[]> {
  try {
    console.log("🔗 Fetching projects from Sui...");

    const objs = await client.getOwnedObjects({
      owner: "0xYourPublisherAddr", // TODO: replace with your publisher address
      options: { showContent: true },
    });

    const projects: ChainProject[] = objs.data.map((obj: SuiObjectResponse, idx: number) => {
      const content = obj.data?.content as SuiParsedData | undefined;

      // Only handle moveObject types
      if (content?.dataType === "moveObject") {
        const fields = content.fields as SuiObjectField;

        return {
          id: obj.data?.objectId ?? `chain-${idx}`,
          name: fields.name ?? "Unnamed Project",
          imageUrl: fields.image_url ?? "/images/project-placeholder.jpg",
          funded: Number(fields.funded_percent ?? 0),
          daysLeft: Number(fields.days_left ?? 0),
          description: fields.description ?? "No description available",
          creator: fields.creator ?? "Unknown",
          goalAmount: Number(fields.goal_amount ?? 0),
          raisedAmount: Number(fields.raised_amount ?? 0),
        };
      }

      // fallback → unknown object, skip
      return {
        id: obj.data?.objectId ?? `chain-${idx}`,
        name: "Unknown Project",
        imageUrl: "/images/project-placeholder.jpg",
        funded: 0,
        daysLeft: 0,
        description: "Invalid or non-move object",
        creator: "Unknown",
        goalAmount: 0,
        raisedAmount: 0,
      };
    });

    return [...projects, ...Object.values(mockProjects)];
  } catch (err) {
    console.error("❌ Error fetching from Sui, using mocks:", err);
    return Object.values(mockProjects);
  }
}

// ---------------- FETCH SINGLE PROJECT ----------------
export async function fetchProjectById(
  projectId: string
): Promise<ChainProject | null> {
  try {
    console.log(`🔗 Fetching project ${projectId} from Sui...`);

    const obj = await client.getObject({
      id: projectId,
      options: { showContent: true },
    });

    const content = obj.data?.content as SuiObjectContent | undefined;
    if (content?.dataType === "moveObject") {
      const fields = content.fields ?? {};

      return {
        id: obj.data?.objectId ?? projectId,
        name: fields?.name ?? "Unnamed Project",
        imageUrl: fields?.image_url ?? "/images/project-placeholder.jpg",
        funded: Number(fields?.funded_percent ?? 0),
        daysLeft: Number(fields?.days_left ?? 0),
        description: fields?.description ?? "No description available",
        creator: fields?.creator ?? "Unknown",
        goalAmount: Number(fields?.goal_amount ?? 0),
        raisedAmount: Number(fields?.raised_amount ?? 0),
      };
    }

    // fallback mock
    return mockProjects[projectId] ?? null;
  } catch (err) {
    console.error(`❌ Error fetching project ${projectId}:`, err);
    return mockProjects[projectId] ?? null;
  }
}


// ---------------- PLEDGE TO PROJECT ----------------
export async function pledgeToProject(
  projectId: string,
  amount: number,
  signAndExecuteTransaction: SignAndExecuteFn
) {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PROJECT_MOVE_TYPE}::pledge`,
    arguments: [
      tx.object(projectId),
      tx.pure(bcs.u64().serialize(amount).toBytes()),
    ],
  });

  const result = await signAndExecuteTransaction({ transaction: tx });

  return {
    success: true,
    txDigest: result.digest,
    projectId,
    pledgedAmount: amount,
  };
}