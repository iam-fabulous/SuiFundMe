import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

const NETWORK = process.env.NEXT_PUBLIC_SUI_NETWORK || "testnet";
const PUBLISHER_ADDRESS = process.env.NEXT_PUBLIC_PUBLISHER_ADDRESS || "";
const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || "";

const client = new SuiClient({
  url: NETWORK === "mainnet" ? getFullnodeUrl("mainnet") : getFullnodeUrl("testnet")
});

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

export async function fetchProjectsFromChain(): Promise<ChainProject[]> {
  try {
    console.log("🔗 Fetching projects from Sui blockchain...");

    if (!PACKAGE_ID || !PUBLISHER_ADDRESS) {
      console.warn("⚠️ Package ID or Publisher Address not configured, using mock data");
      return Object.values(mockProjects);
    }

    const projects: ChainProject[] = [];

    try {
      const ownedObjects = await client.getOwnedObjects({
        owner: PUBLISHER_ADDRESS,
        options: { showType: true, showContent: true },
      });
      const campaignObjects = ownedObjects.data.filter(obj => {
        const objType = obj.data?.type;
        return objType?.includes(`${PACKAGE_ID}::suifundme_smartcontract::Campaign`);
      });

      console.log(`📊 Found ${campaignObjects.length} Campaign objects`);

      for (const obj of campaignObjects) {
        try {
          const project = await processCampaignObject(obj);
          if (project) {
            projects.push(project);
          }
        } catch (error) {
          console.error(`❌ Error processing campaign ${obj.data?.objectId}:`, error);
        }
      }

      if (projects.length === 0) {
        console.log("📝 No real campaigns found, using mock data for development");
        return Object.values(mockProjects);
      }

      console.log(`✅ Successfully fetched ${projects.length} real projects from blockchain`);
      return projects;

    } catch (ownedObjectsError) {
      console.warn("⚠️ Failed to fetch by owned objects, trying alternative methods:", ownedObjectsError);

      try {
        const txBlocks = await client.queryTransactionBlocks({
          limit: 50, 
          options: {
            showInput: true,
            showEffects: true,
            showEvents: true
          }
        });

        const campaignIds: string[] = [];

        for (const tx of txBlocks.data) {
          const events = tx.events || [];
          for (const event of events) {
            if (event.type?.includes(`${PACKAGE_ID}::suifundme_smartcontract::CampaignCreated`)) {
              const campaignId = (event.parsedJson as any)?.campaign_id;
              if (campaignId && !campaignIds.includes(campaignId)) {
                campaignIds.push(campaignId);
              }
            }
          }
        }

        console.log(`📊 Found ${campaignIds.length} campaign IDs from events`);

        for (const campaignId of campaignIds) {
          try {
            const campaignObject = await client.getObject({
              id: campaignId,
              options: { showContent: true, showType: true }
            });

            const project = await processCampaignObject(campaignObject);
            if (project) {
              projects.push(project);
            }
          } catch (error) {
            console.error(`❌ Error fetching campaign ${campaignId}:`, error);
          }
        }

        if (projects.length > 0) {
          return projects;
        }

      } catch (transactionError) {
        console.warn("⚠️ Failed transaction-based discovery:", transactionError);
      }
    }

    console.log("📝 Using mock data as final fallback");
    return Object.values(mockProjects);

  } catch (err) {
    console.error("❌ Critical error in fetchProjectsFromChain:", err);
    return Object.values(mockProjects);
  }
}

async function processCampaignObject(obj: any): Promise<ChainProject | null> {
  try {
    const content = obj.data?.content;
    if (!content || content.dataType !== "moveObject") {
      return null;
    }

    const fields = content.fields;
    if (!fields) {
      return null;
    }

    const objId = obj.data?.objectId || obj.objectId || 'unknown';
    if (!fields.creator || !fields.goal || !fields.end_time) {
      console.warn(`⚠️ Campaign ${objId} missing required fields`);
      return null;
    }

    let descriptionText = "No description available";
    if (fields.description && Array.isArray(fields.description)) {
      try {
        const descriptionBytes = new Uint8Array(fields.description);
        descriptionText = new TextDecoder().decode(descriptionBytes);
      } catch (error) {
        console.warn(`⚠️ Failed to decode description for campaign ${obj.objectId}`);
      }
    }

    const goal = Number(fields.goal) || 0;
    let balance = Number(fields.balance) || 0;

    if (fields.balance && typeof fields.balance === 'object') {
      const balanceObj = fields.balance as any;
      const balanceValue = balanceObj.fields?.value || balanceObj.value || fields.balance;
      const balanceNum = typeof balanceValue === 'string' ? Number(balanceValue) : Number(balanceValue);
      balance = balanceNum || 0;
    }

    const fundedPercent = goal > 0 ? Math.round(Math.min(100, (balance / goal) * 100)) : 0;

    const endTimeMs = Number(fields.end_time) || 0;
    const currentTime = Date.now();
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysLeft = endTimeMs > currentTime ? Math.max(1, Math.ceil((endTimeMs - currentTime) / msPerDay)) : 0;

    let imageUrl = "/images/project-placeholder.jpg";
    if (fields.media_blob_id && Array.isArray(fields.media_blob_id)) {
      try {
        const blobIdHex = fields.media_blob_id
          .map((byte: number) => byte.toString(16).padStart(2, '0'))
          .join('');

        if (blobIdHex && blobIdHex !== '00'.repeat(fields.media_blob_id.length)) {
          const walrusHost = NETWORK === "mainnet"
            ? "https://aggregator.walrus-prod.su.io"
            : "https://aggregator.walrus-testnet.sui.io";
          imageUrl = `${walrusHost}/v1/blobs/${blobIdHex}`;
        }
      } catch (error) {
        console.warn(`⚠️ Failed to parse media blob ID for campaign ${obj.objectId}:`, error);
      }
    }

    const project: ChainProject = {
      id: objId,
      name: descriptionText.length > 60 ? `${descriptionText.substring(0, 60)}...` : descriptionText,
      imageUrl,
      funded: fundedPercent,
      daysLeft,
      description: descriptionText,
      creator: fields.creator,
      goalAmount: Math.floor(goal / 1e9),
      raisedAmount: Math.floor(balance / 1e9),
    };

    console.log(`✅ Successfully processed campaign ${project.id}: ${project.name}`);
    return project;

  } catch (error) {
    console.error(`❌ Error processing campaign object:`, error);
    return null;
  }
}

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
      const fields = (content as any).fields;

      const descriptionText = fields?.description
        ? new TextDecoder().decode(new Uint8Array(fields.description))
        : "No description available";

      const goal = Number(fields?.goal ?? 0);
      const balance = Number(fields?.balance ?? 0);
      const fundedPercent = goal > 0 ? Math.round((balance / goal) * 100) : 0;

      const endTime = Number(fields?.end_time ?? 0);
      const currentTime = Date.now();
      const daysLeft = Math.max(0, Math.ceil((endTime - currentTime) / (1000 * 60 * 60 * 24)));

      const mediaBlobId = fields?.media_blob_id;
      let imageUrl = "/images/project-placeholder.jpg";
      if (mediaBlobId && Array.isArray(mediaBlobId)) {
        try {
          const blobIdHex = Array.from(mediaBlobId, byte => byte.toString(16).padStart(2, '0')).join('');
          imageUrl = `https://aggregator.walrus-testnet.sui.io/v1/blobs/${blobIdHex}`;
        } catch (e) {
          console.log("Could not parse media blob ID");
        }
      }

      return {
        id: obj.data?.objectId ?? projectId,
        name: descriptionText.length > 50 ? `${descriptionText.substring(0, 50)}...` : descriptionText,
        imageUrl,
        funded: fundedPercent,
        daysLeft,
        description: descriptionText,
        creator: fields?.creator ?? "Unknown",
        goalAmount: goal,
        raisedAmount: balance,
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
  console.log(`� Attempting to pledge ${amount} SUI to project ${projectId}`);

  try {
    return {
      success: true,
      txDigest: "0xMockTxDigest",
    };
  } catch (err) {
    console.error(`❌ Failed to pledge to project ${projectId}:`, err);
    return { success: false };
  }
}
