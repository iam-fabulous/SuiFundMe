import { Transaction } from "@mysten/sui/transactions";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

export function stringToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

export function stringsToBytes(strings: string[]): Uint8Array[] {
  return strings.map(str => stringToBytes(str));
}

export function suiToMist(suiAmount: string): bigint {
  const suiFloat = parseFloat(suiAmount);
  return BigInt(Math.floor(suiFloat * 1e9));
}

export function daysToMilliseconds(days: string): bigint {
  const daysInt = parseInt(days);
  return BigInt(daysInt * 24 * 60 * 60 * 1000);
}


export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || "0x0";
export const MODULE_NAME = process.env.NEXT_PUBLIC_MODULE_NAME || "suifundme_smartcontract";


export const suiClient = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

export async function createCampaignTransaction({
  goal,
  durationMs,
  descriptionBytes,
  mediaBlobIdBytes,
  tierNames,
  tierMinAmounts,
  tierDescriptions,
}: {
  goal: bigint;
  durationMs: bigint;
  descriptionBytes: Uint8Array;
  mediaBlobIdBytes: Uint8Array;
  tierNames: Uint8Array[];
  tierMinAmounts: bigint[];
  tierDescriptions: Uint8Array[];
}) {
  const tx = new Transaction();

  tx.moveCall({
    package: PACKAGE_ID,
    module: MODULE_NAME,
    function: "create_campaign",
    arguments: [
      tx.pure.u64(goal.toString()),
      tx.pure.u64(durationMs.toString()),
      tx.pure.vector("u8", Array.from(descriptionBytes)),
      tx.pure.vector("u8", Array.from(mediaBlobIdBytes)),
      tx.pure.vector("vector<u8>", tierNames.map(arr => Array.from(arr))),
      tx.pure.vector("u64", tierMinAmounts.map(amount => amount.toString())),
      tx.pure.vector("vector<u8>", tierDescriptions.map(arr => Array.from(arr))),
      tx.object("0x6"), 
    ],
  });

  return tx;
}

export async function donateToCampaignTransaction({ campaignId, paymentId, tierIndex }: {
  campaignId: string;
  paymentId: string;
  tierIndex: number;
}) {
  const tx = new Transaction();

  tx.moveCall({
    package: PACKAGE_ID,
    module: MODULE_NAME,
    function: "donate",
    arguments: [
      tx.object(campaignId),
      tx.object(paymentId),
      tx.pure.u64(tierIndex.toString()),
      tx.object("0x6"), 
    ],
  });

  return tx;
}

export async function claimFundsTransaction({ capId, campaignId }: {
  capId: string;
  campaignId: string;
}) {
  const tx = new Transaction();

  tx.moveCall({
    package: PACKAGE_ID,
    module: MODULE_NAME,
    function: "claim_funds",
    arguments: [
      tx.object(capId),
      tx.object(campaignId),
      tx.object("0x6"), 
    ],
  });

  return tx;
}

export async function refundTransaction({ campaignId, contributionId }: {
  campaignId: string;
  contributionId: string;
}) {
  const tx = new Transaction();

  tx.moveCall({
    package: PACKAGE_ID,
    module: MODULE_NAME,
    function: "refund",
    arguments: [
      tx.object(campaignId),
      tx.object(contributionId),
      tx.object("0x6"), 
    ],
  });

  return tx;
}

export async function cancelCampaignTransaction({ capId, campaignId }: {
  capId: string;
  campaignId: string;
}) {
  const tx = new Transaction();

  tx.moveCall({
    package: PACKAGE_ID,
    module: MODULE_NAME,
    function: "cancel_campaign",
    arguments: [
      tx.object(capId),
      tx.object(campaignId),
    ],
  });

  return tx;
}

export async function executeTransaction(tx: Transaction) {
  throw new Error("This function should be used within a component with wallet access");
}
