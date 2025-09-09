import { WalrusClient } from '@mysten/walrus';

export const WALRUS_AGGREGATOR = 'https://aggregator.walrus-testnet.sui.io';
export const WALRUS_PUBLISHER = 'https://publisher.walrus-testnet.sui.io';


let walrusClient: WalrusClient | null = null;

const getWalrusClient = (): WalrusClient => {
  if (!walrusClient) {
    walrusClient = new WalrusClient({
      network: 'testnet',
      suiRpcUrl: 'https://fullnode.testnet.sui.io'
    });
  }
  return walrusClient;
};


export async function uploadToWalrus(file: File, account: string): Promise<{ blobId: string; transaction: any }> {
  try {
    console.log(`Preparing ${file.name} for Walrus upload...`);

    const arrayBuffer = await file.arrayBuffer();
    const blob = new Uint8Array(arrayBuffer);

    const client = getWalrusClient();
    const { blobId, metadata, rootHash } = await client.encodeBlob(blob);

    console.log(`Encoded ${file.name}, blob ID: ${blobId}`);

    const registerTx = await client.registerBlobTransaction({
      transaction: undefined,
      size: blob.length,
      epochs: 1,
      blobId,
      rootHash,
      deletable: true,
      owner: account
    });

    return { blobId, transaction: registerTx };
  } catch (error) {
    console.error("Failed to prepare Walrus upload:", error);
    throw new Error("Media upload preparation failed");
  }
}

export async function uploadSingleFileToWalrus(file: File, account: string): Promise<{ blobId: string; transaction: any }> {
  if (!file) {
    throw new Error("No file provided")
  }

  return uploadToWalrus(file, account);
}

export async function uploadMultipleToWalrus(files: File[], account: string): Promise<{ blobIds: string[]; transactions: any[] }> {
  try {
    const uploads = await Promise.all(files.map(file => uploadToWalrus(file, account)));

    const blobIds = uploads.map(upload => upload.blobId);
    const transactions = uploads.map(upload => upload.transaction);

    return { blobIds, transactions };
  } catch (error) {
    console.error("Failed to prepare multiple Walrus uploads:", error);
    throw new Error("Multiple media upload preparation failed");
  }
}

export function getWalrusBlobUrl(blobId: string): string {
  return `${WALRUS_AGGREGATOR}/v1/blobs/${blobId}`;
}

export async function downloadFromWalrus(blobId: string): Promise<Uint8Array> {
  try {
    console.log(`Downloading blob: ${blobId} from Walrus`);

    const client = getWalrusClient();
    const blobData = await client.readBlob({ blobId });

    console.log(`Downloaded blob: ${blobId} successfully`);

    return blobData;
  } catch (error) {
    console.error("Failed to download from Walrus:", error);
    throw new Error("Media download failed");
  }
}

export function getPrimaryImageBlobId(blobIds: string[], files: File[]): string {

  const imageFileIndex = files.findIndex(file => file.type.startsWith('image/'));

  if (imageFileIndex >= 0 && imageFileIndex < blobIds.length) {
    return blobIds[imageFileIndex];
  }

  return blobIds[0] || "";
}
