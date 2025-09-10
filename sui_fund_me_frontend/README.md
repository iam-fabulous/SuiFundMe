
# SUI FUND ME - Production Deployment Guide

## 🚀 Getting Real Projects & Walrus Media to Display on Marketplace

This guide will help you configure your SUI Fund Me application to display REAL projects with WALRUS media from the blockchain instead of mock data.

---

## 📋 Prerequisites

- Node.js 18+
- Sui CLI installed (`sui --version`)
- Git
- A Sui wallet (with test SUI coins for testnet)

---

## 🔧 Step 1: Deploy Smart Contract

### 1.1 Navigate to smart contract directory
```bash
cd SuiFundMe_SmartContract
```

### 1.2 Build the contract
```bash
sui client publish
```

### 1.3 Get your Package ID
After successful deployment, you'll see output like:
```
Transaction Digest: XYZ...
Package ID: 0x123456789abcdef0...
Published Object ID: 0x123456789abcdef0...
```

Copy the `Published Object ID` / `Package ID` - this is your contract address.

### 1.4 Get your Publisher Address
Check your Sui wallet or use:
```bash
sui client addresses
```
This will show your wallet address - use it as the publisher address.

---

## ⚙️ Step 2: Configure Environment Variables

### 2.1 Update `.env.local` file
```bash
# Replace with your actual values
NEXT_PUBLIC_PACKAGE_ID=0x123456789abcdef0...  # Your contract package ID
NEXT_PUBLIC_PUBLISHER_ADDRESS=0x87654321fedcba... # Your wallet address
NEXT_PUBLIC_SUI_NETWORK=testnet  # Change to 'mainnet' for production
NEXT_PUBLIC_MODULE_NAME=suifundme_smartcontract  # Keep as-is
```

### 2.2 Verify configuration
```bash
# Check your .gitignore includes .env.local
# This file should contain sensitive environment variables
```

---

## 🎯 Step 3: Test Real Project Creation

### 3.1 Start your application
```bash
npm run dev
```

### 3.2 Create a real project
1. Go to `/createProject` page
2. Connect your wallet
3. Upload 1 image or video file
4. Fill in project details
5. Create the project

### 3.3 Check the blockchain
Visit Sui Explorer and search for your contract address to verify the project was created with:
- Project description
- Media blob ID pointing to Walrus
- Goal amount and other metadata

---

## 🎨 Step 4: Verify Marketplace Displays Real Data

### 4.1 Visit marketplace
Go to `/marketplace` page

### 4.2 Check console logs
Look for these log messages:
```
🔗 Fetching projects from Sui blockchain...
📊 Found X Campaign objects
✅ Successfully fetched X real projects from blockchain
```

### 4.3 Verify Walrus images load
- Images should load from `https://aggregator.walrus-testnet.sui.io/v1/blobs/{blobId}`
- No placeholder images should appear
- Image URLs should be actual Walrus blob URLs

---

## 🔍 Troubleshooting

### Issue: Still showing mock data
**Solution:** Check your `.env.local` file has correct values:
```bash
# Make sure these are not empty or default values
NEXT_PUBLIC_PACKAGE_ID=0x_actual_contract_address
NEXT_PUBLIC_PUBLISHER_ADDRESS=0x_your_wallet_address
```

### Issue: Images not loading
**Solution:** Verify Walrus blob URLs:
1. Check browser console for 404 errors on image URLs
2. Verify blob IDs in contract match Walrus upload
3. Ensure network matches (testnet blob URLs on testnet network)

### Issue: No campaign objects found
**Solution:** Verify your publisher address:
1. Make sure you used the correct wallet for contract deployment
2. Check Sui Explorer to see who owns the contract objects
3. Update `NEXT_PUBLIC_PUBLISHER_ADDRESS` accordingly

---

## 🎯 What Happens in Production

### When Blockchain Has Real Campaigns:
```
1. User visits /marketplace
2. API calls fetchProjectsFromChain()
3. Sui Client queries your deployed contract
4. Returns real projects with Walrus media URLs
5. Images load from Walrus decentralized storage
6. Funding progress shows live SUI amounts
7. Days left calculated in real-time
```

### Real Project Example:
```json
{
  "id": "0x768e7b8e8a9f01c8...",
  "name": "Sustainable Energy Revolution",
  "imageUrl": "https://aggregator.walrus-testnet.sui.io/v1/blobs/1234567890abcdef",
  "funded": 75,
  "daysLeft": 25,
  "creator": "0x87654321fedcba..."
}
```

---

## 🚀 Production Checklist

- ✅ Smart contract deployed to testnet/mainnet
- ✅ Package ID and publisher address configured
- ✅ Environment variables set in `.env.local`
- ✅ Real project created via UI
- ✅ Marketplace loads real data from blockchain
- ✅ Walrus images display correctly
- ✅ Funding amounts and progress accurate

---

## 🌐 Switching to Mainnet

When ready for mainnet deployment:
```bash
# In .env.local
NEXT_PUBLIC_SUI_NETWORK=mainnet

# Then redeploy smart contract on mainnet
sui client publish --testnet=false
```

Mainnet Walrus URLs will automatically be used for media.

---

## 📞 Support

If you encounter issues:

1. **Check console logs** for detailed error messages
2. **Verify environment variables** are correctly set
3. **Check Sui Explorer** to confirm contract deployment
4. **Ensure wallet connectivity** and gas fees for transactions

Your marketplace now displays REAL blockchain data with WALRUS media! 🎉✨
