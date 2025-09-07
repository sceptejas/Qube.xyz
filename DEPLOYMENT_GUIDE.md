# BTC Lending Platform - Complete Deployment Guide

## 🚀 **Quick Start**

To deploy the BTC Lending Platform and store all deployment data:

```bash
# 1. Deploy all contracts
./deploy_contracts.sh <YOUR_WALLET_ADDRESS> <YOUR_PRIVATE_KEY> [NETWORK]

# 2. Verify deployment
./verify_deployment.sh <YOUR_WALLET_ADDRESS> [NETWORK]
```

## 📋 **Prerequisites**

1. **Aptos CLI**: Install from [aptos.dev](https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli/)
2. **Wallet**: Have a wallet address and private key ready
3. **APT Tokens**: Sufficient APT for gas fees (recommended: 1-2 APT)

## 🔧 **Deployment Scripts**

### 1. **Main Deployment Script** (`deploy_contracts.sh`)

**Purpose**: Deploys all smart contracts and stores deployment data

**Usage**:
```bash
./deploy_contracts.sh <WALLET_ADDRESS> <PRIVATE_KEY> [NETWORK]
```

**Parameters**:
- `WALLET_ADDRESS`: Your wallet address (required)
- `PRIVATE_KEY`: Your private key (required)
- `NETWORK`: Network to deploy to (optional, default: testnet)

**Available Networks**:
- `testnet` (default): https://fullnode.testnet.aptoslabs.com/v1
- `mainnet`: https://fullnode.mainnet.aptoslabs.com/v1
- `devnet`: https://fullnode.devnet.aptoslabs.com/v1

**What it does**:
1. ✅ Checks prerequisites (Aptos CLI)
2. ✅ Updates Move.toml with your wallet address
3. ✅ Compiles all Move contracts
4. ✅ Sets up Aptos profile
5. ✅ Publishes the package
6. ✅ Runs deployment script
7. ✅ Verifies deployment
8. ✅ Stores deployment data
9. ✅ Extracts ABI and bytecode

### 2. **ABI & Bytecode Extraction Script** (`extract_deployment_data.sh`)

**Purpose**: Extracts and stores ABI and bytecode data for deployed contracts

**Usage**:
```bash
./extract_deployment_data.sh <WALLET_ADDRESS> <NETWORK> <DEPLOYMENT_DIR>
```

**What it creates**:
- `abis/` - Individual contract ABIs
- `bytecode/` - Contract bytecode files
- `metadata/` - Package metadata
- `contract_abis_comprehensive.json` - Complete ABI data
- `deployment_info.json` - Deployment information
- `DEPLOYMENT_SUMMARY.md` - Human-readable summary
- `verify_deployment.sh` - Verification script

### 3. **Deployment Verification Script** (`verify_deployment.sh`)

**Purpose**: Verifies that all contracts are properly deployed and functioning

**Usage**:
```bash
./verify_deployment.sh <WALLET_ADDRESS> [NETWORK]
```

**What it checks**:
- ✅ Account accessibility
- ✅ Contract deployment status
- ✅ Module resource presence
- ✅ Network connectivity
- ✅ Contract functionality

## 📁 **Deployment Data Structure**

After deployment, you'll have:

```
deployment_data/
├── abis/
│   ├── interest_rate_model_abi.json
│   ├── collateral_vault_abi.json
│   ├── loan_manager_abi.json
│   ├── ctrl_btc_token_abi.json
│   └── ln_btc_token_abi.json
├── bytecode/
│   ├── interest_rate_model.mv
│   ├── collateral_vault.mv
│   ├── loan_manager.mv
│   ├── ctrl_btc_token.mv
│   └── ln_btc_token.mv
├── metadata/
│   └── package-metadata.bcs
├── contract_abis_comprehensive.json
├── deployment_info.json
├── DEPLOYMENT_SUMMARY.md
└── verify_deployment.sh
```

## 🏗️ **Contract Architecture**

### **Deployed Contracts**:

1. **InterestRateModel** (`interest_rate_model`)
   - Manages interest rates based on LTV ratios
   - Default rates: 30%→5%, 45%→8%, 60%→10%

2. **CollateralVault** (`collateral_vault`)
   - Manages BTC collateral deposits/withdrawals
   - Mints/burns ctrlBTC tokens
   - Locks/unlocks collateral for loans

3. **LoanManager** (`loan_manager`)
   - Handles loan lifecycle management
   - Creates, repays, and closes loans
   - Manages loan state and calculations

4. **ctrlBTC Token** (`ctrl_btc_token`)
   - Fungible asset representing collateralized BTC
   - Minted when BTC is deposited
   - Burned when BTC is withdrawn

5. **lnBTC Token** (`ln_btc_token`)
   - Fungible asset representing loaned BTC
   - Minted when loans are created
   - Burned when loans are repaid

## 🔗 **Contract Addresses**

After deployment, your contracts will be at:
- **InterestRateModel**: `YOUR_WALLET_ADDRESS::interest_rate_model`
- **CollateralVault**: `YOUR_WALLET_ADDRESS::collateral_vault`
- **LoanManager**: `YOUR_WALLET_ADDRESS::loan_manager`
- **ctrlBTC Token**: `YOUR_WALLET_ADDRESS::ctrl_btc_token`
- **lnBTC Token**: `YOUR_WALLET_ADDRESS::ln_btc_token`

## 🚀 **Deployment Examples**

### **Testnet Deployment**:
```bash
./deploy_contracts.sh 0x1234...abcd 0x5678...efgh testnet
```

### **Mainnet Deployment**:
```bash
./deploy_contracts.sh 0x1234...abcd 0x5678...efgh mainnet
```

### **Verification**:
```bash
./verify_deployment.sh 0x1234...abcd testnet
```

## 📊 **Post-Deployment Steps**

1. **Verify on Explorer**: Check contracts on [Aptos Explorer](https://explorer.aptoslabs.com/)
2. **Test Functionality**: Test with small amounts first
3. **Frontend Integration**: Use provided ABIs for integration
4. **Monitoring**: Set up monitoring for contract events

## 🔧 **Manual Deployment** (Alternative)

If you prefer manual deployment:

```bash
# 1. Compile contracts
aptos move compile --save-metadata

# 2. Set up profile
aptos init --profile btc_lending --private-key YOUR_PRIVATE_KEY --rest-url https://fullnode.testnet.aptoslabs.com/v1

# 3. Publish package
aptos move publish --profile btc_lending --package-dir . --named-addresses btc_lending_platform=YOUR_WALLET_ADDRESS

# 4. Run deployment script
aptos move run --profile btc_lending --function-id YOUR_WALLET_ADDRESS::deploy::deploy
```

## 🛠️ **Troubleshooting**

### **Common Issues**:

1. **"aptos CLI not found"**
   - Install Aptos CLI from [aptos.dev](https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli/)

2. **"Compilation failed"**
   - Check Move.toml configuration
   - Ensure all dependencies are available

3. **"Account not found"**
   - Verify wallet address is correct
   - Ensure account has sufficient APT for gas

4. **"Contract not found"**
   - Run verification script to check deployment status
   - Check Aptos Explorer for contract status

### **Getting Help**:

- Check deployment logs in `deployment_data/deployment_*.log`
- Verify contracts on Aptos Explorer
- Run verification script for detailed status

## 🎉 **Success!**

Once deployment is complete, you'll have:
- ✅ All 5 contracts deployed and verified
- ✅ Complete ABI and bytecode data stored
- ✅ Deployment verification completed
- ✅ Ready for frontend integration

Your BTC Lending Platform is now live and ready to use! 🚀



