// sui-fund-me-contract-deployment.js
//
// This script helps deploy your Sui Fund Me smart contract to testnet or mainnet
// and automatically updates your environment variables for easy development.
//
// Prerequisites:
// - Sui CLI installed: https://sui.io/docs/cli
// - Your wallet configured with Sui CLI

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const NETWORK = process.argv[2] === 'mainnet' ? 'mainnet' : 'testnet';
const CONTRACT_DIR = path.join(__dirname, '../SuiFundMe_SmartContract');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  fg: {
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
  },
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * Check if Sui CLI is installed
 */
function checkSuiCli() {
  try {
    execSync('sui --version', { stdio: 'pipe' });
    log(colors.fg.green, '✅ Sui CLI is installed');
    return true;
  } catch (error) {
    log(colors.fg.red, '❌ Sui CLI is not installed. Please install it first:');
    log(colors.fg.yellow, '   Visit: https://sui.io/docs/cli/install');
    process.exit(1);
  }
}

/**
 * Check if wallet is configured
 */
function checkWallet() {
  try {
    const output = execSync('sui client active-address', { encoding: 'utf8' });
    const activeAddress = output.trim().split(': ')[1];
    log(colors.fg.green, `✅ Active wallet address: ${colors.fg.cyan}${activeAddress}`);
    return activeAddress;
  } catch (error) {
    log(colors.fg.red, '❌ No active Sui wallet found. Please configure your wallet:');
    log(colors.fg.yellow, '   sui client new-address secp256k1');
    process.exit(1);
  }
}

/**
 * Switch to testnet/mainnet
 */
function switchNetwork() {
  try {
    execSync(`sui client switch --testnet=${NETWORK === 'testnet'}`, { stdio: 'inherit' });
    log(colors.fg.green, `✅ Switched to ${NETWORK}`);
  } catch (error) {
    log(colors.fg.red, `❌ Failed to switch to ${NETWORK}`);
    process.exit(1);
  }
}

/**
 * Publish the smart contract
 */
function publishContract() {
  try {
    log(colors.fg.blue, `🚀 Publishing contract to ${NETWORK}`);

    const publishCommand = `sui client publish "${CONTRACT_DIR}" --gas-budget 100000000 --json`;

    log(colors.fg.yellow, `Executing: ${publishCommand}`);

    const output = execSync(publishCommand, { encoding: 'utf8', cwd: CONTRACT_DIR });

    const result = JSON.parse(output);

    // Extract useful information
    const transactionDigest = result.digest;
    const packageId = result.objectChanges.find(change =>
      change.type === 'published'
    )?.publishedObject?.storageRebate || result.objectChanges.find(change =>
      change.type === 'published'
    )?.packageId;

    log(colors.fg.green, `✅ Contract published successfully!`);
    log(colors.fg.blue, `📦 Package ID: ${colors.fg.cyan}${packageId}`);
    log(colors.fg.blue, `🔗 Transaction: ${colors.fg.cyan}${transactionDigest}`);

    return { packageId, transactionDigest };

  } catch (error) {
    log(colors.fg.red, '❌ Failed to publish contract:');
    console.log(error.stdout || error.stderr);
    process.exit(1);
  }
}

/**
 * Update environment variables
 */
function updateEnvFile(packageId, activeAddress) {
  const envPath = path.join(__dirname, '../.env.local');

  let envContent = '';
  try {
    envContent = fs.readFileSync(envPath, 'utf8');
  } catch (error) {
    // File doesn't exist, create it
    envContent = '';
  }

  const lines = envContent.split('\n');

  // Update or add environment variables
  const updates = [
    ['NEXT_PUBLIC_SUI_NETWORK', NETWORK],
    ['NEXT_PUBLIC_PACKAGE_ID', packageId],
    ['NEXT_PUBLIC_MODULE_NAME', 'suifundme_smartcontract'],
    ['NEXT_PUBLIC_PUBLISHER_ADDRESS', activeAddress],
  ];

  updates.forEach(([key, value]) => {
    const existingIndex = lines.findIndex(line => line.startsWith(`${key}=`));
    const newLine = `${key}=${value}`;

    if (existingIndex >= 0) {
      lines[existingIndex] = newLine;
      log(colors.fg.blue, `🔄 Updated ${key}`);
    } else {
      lines.push(newLine);
      log(colors.fg.blue, `➕ Added ${key}`);
    }
  });

  // Add header comment if not present
  if (!lines.some(line => line.includes('SUI FUND ME PRODUCTION ENVIRONMENT'))) {
    lines.unshift(...[
      '# ============================================================================',
      '# SUI FUND ME PRODUCTION ENVIRONMENT CONFIGURATION',
      '# ============================================================================',
      '',
    ]);
  }

  fs.writeFileSync(envPath, lines.join('\n'), 'utf8');

  log(colors.fg.green, `✅ Updated ${envPath} with deployment details`);
}

/**
 * Main deployment function
 */
async function deploy() {
  log(colors.fg.blue, '🚀 Starting Sui Fund Me Smart Contract Deployment');
  log(colors.fg.blue, `🌐 Target Network: ${NETWORK}`);
  log(colors.fg.yellow, '==========================================\n');

  // Pre-deployment checks
  checkSuiCli();
  const activeAddress = checkWallet();

  // Prepare for deployment
  switchNetwork();

  // Deploy contract
  const { packageId, transactionDigest } = publishContract();

  if (!packageId) {
    log(colors.fg.red, '❌ Package ID not found in deployment result');
    process.exit(1);
  }

  // Update configuration
  updateEnvFile(packageId, activeAddress);

  // Success summary
  log(colors.fg.green, '\n🎉 DEPLOYMENT SUCCESSFUL! 🎉');
  log(colors.fg.cyan, '==========================================');
  log(colors.fg.cyan, `📦 Package ID: ${packageId}`);
  log(colors.fg.cyan, `🔗 Explorer: https://suiexplorer.com/txblock/${transactionDigest}?network=${NETWORK}`);
  log(colors.fg.cyan, `👤 Publisher Address: ${activeAddress}`);
  log(colors.fg.cyan, `🌐 Network: ${NETWORK}`);
  log(colors.fg.yellow, '🙏 Don\'t forget to update the deploy_contracts.json file!');
  log(colors.fg.cyan, '==========================================\n');

  log(colors.fg.green, '✅ Next Steps:');
  log(colors.fg.yellow, `   1. Start your app: npm run dev`);
  log(colors.fg.yellow, `   2. Visit http://localhost:3000/marketplace`);
  log(colors.fg.yellow, `   3. Create a project with media to test Walrus integration`);
  log(colors.fg.yellow, `   4. See real projects display in the marketplace!`);

  log(colors.fg.blue, '\n🔗 Useful Links:');
  log(colors.fg.yellow, `   📋 Sui Explorer: https://suiexplorer.com/?network=${NETWORK}`);
  log(colors.fg.yellow, `   📖 Documentation: https://sui.io/docs`);
  log(colors.fg.yellow, `   💬 Discord: https://discord.gg/sui`);
}

/**
 * Check current configuration
 */
function checkConfig() {
  const envPath = path.join(__dirname, '../.env.local');

  try {
    if (!fs.existsSync(envPath)) {
      log(colors.fg.yellow, '⚠️  No .env.local file found. Run deployment first.');
      return;
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');

    log(colors.fg.blue, '📋 Current Environment Configuration:');
    log(colors.fg.cyan, '==========================================');

    const configKeys = [
      'NEXT_PUBLIC_SUI_NETWORK',
      'NEXT_PUBLIC_PACKAGE_ID',
      'NEXT_PUBLIC_MODULE_NAME',
      'NEXT_PUBLIC_PUBLISHER_ADDRESS'
    ];

    configKeys.forEach(key => {
      const line = lines.find(l => l.startsWith(`${key}=`));
      const value = line ? line.split('=')[1] : 'Not set';
      const status = line ? '✅' : '❌';
      log(colors.fg.cyan, `${status} ${key}: ${colors.fg.yellow}${value}`);
    });

    log(colors.fg.cyan, '==========================================');

  } catch (error) {
    log(colors.fg.red, '❌ Error reading configuration:', error.message);
  }
}

// Command line interface
if (require.main === module) {
  const command = process.argv[2] || 'deploy';
  const validNetworks = ['testnet', 'mainnet'];

  if (command === 'deploy') {
    const network = process.argv[3] || 'testnet';
    const validNetwork = validNetworks.includes(network);

    if (!validNetwork) {
      log(colors.fg.red, '❌ Invalid network. Use: node deploy-contract-standalone.js testnet or node deploy-contract-standalone.js mainnet');
      process.exit(1);
    }

    deploy().catch(error => {
      log(colors.fg.red, '❌ Deployment failed:');
      console.error(error);
      process.exit(1);
    });
  } else if (command === 'check') {
    checkConfig();
  } else {
    log(colors.fg.yellow, 'Usage:');
    log(colors.fg.yellow, '  Deploy: node deploy-contract-standalone.js deploy testnet');
    log(colors.fg.yellow, '  Config:  node deploy-contract-standalone.js check');
  }
}
