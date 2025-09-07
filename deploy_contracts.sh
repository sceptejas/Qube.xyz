#!/bin/bash

# BTC Lending Platform - Comprehensive Deployment Script
# This script deploys all smart contracts and stores deployment data

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOYMENT_DIR="$SCRIPT_DIR/deployment_data"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DEPLOYMENT_LOG="$DEPLOYMENT_DIR/deployment_$TIMESTAMP.log"

echo -e "${GREEN}🚀 BTC Lending Platform - Comprehensive Deployment Script${NC}"
echo "================================================================"

# Check if wallet address and private key are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${RED}❌ Error: Please provide wallet address and private key${NC}"
    echo "Usage: ./deploy_contracts.sh <WALLET_ADDRESS> <PRIVATE_KEY> [NETWORK]"
    echo "Example: ./deploy_contracts.sh 0x1234...abcd 0x5678...efgh testnet"
    echo ""
    echo "Available networks:"
    echo "  - testnet (default): https://fullnode.testnet.aptoslabs.com/v1"
    echo "  - mainnet: https://fullnode.mainnet.aptoslabs.com/v1"
    echo "  - devnet: https://fullnode.devnet.aptoslabs.com/v1"
    exit 1
fi

WALLET_ADDRESS=$1
PRIVATE_KEY=$2
NETWORK=${3:-testnet}

# Set network URL based on input
case $NETWORK in
    "mainnet")
        REST_URL="https://fullnode.mainnet.aptoslabs.com/v1"
        EXPLORER_URL="https://explorer.aptoslabs.com"
        ;;
    "devnet")
        REST_URL="https://fullnode.devnet.aptoslabs.com/v1"
        EXPLORER_URL="https://explorer.devnet.aptoslabs.com"
        ;;
    "testnet"|*)
        REST_URL="https://fullnode.testnet.aptoslabs.com/v1"
        EXPLORER_URL="https://explorer.testnet.aptoslabs.com"
        ;;
esac

echo -e "${YELLOW}📋 Deployment Configuration:${NC}"
echo "Wallet Address: $WALLET_ADDRESS"
echo "Private Key: ${PRIVATE_KEY:0:10}..."
echo "Network: $NETWORK"
echo "REST URL: $REST_URL"
echo "Explorer: $EXPLORER_URL"
echo ""

# Create deployment data directory
mkdir -p "$DEPLOYMENT_DIR"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$DEPLOYMENT_LOG"
}

# Function to check if aptos CLI is installed
check_aptos_cli() {
    if ! command -v aptos &> /dev/null; then
        log "${RED}❌ Error: aptos CLI is not installed${NC}"
        log "Please install aptos CLI: https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli/"
        exit 1
    fi
    log "${GREEN}✅ Aptos CLI found${NC}"
}

# Function to update Move.toml with wallet address
update_move_toml() {
    log "${YELLOW}🔧 Updating Move.toml with wallet address...${NC}"
    
    # Create backup
    cp Move.toml Move.toml.backup
    
    # Update the address in Move.toml
    sed -i "s/btc_lending_platform = \".*\"/btc_lending_platform = \"$WALLET_ADDRESS\"/" Move.toml
    
    log "${GREEN}✅ Move.toml updated${NC}"
}

# Function to compile contracts
compile_contracts() {
    log "${YELLOW}🔨 Compiling Move contracts...${NC}"
    
    if ! aptos move compile --save-metadata; then
        log "${RED}❌ Compilation failed${NC}"
        exit 1
    fi
    
    log "${GREEN}✅ Contracts compiled successfully${NC}"
}

# Function to setup aptos profile
setup_aptos_profile() {
    log "${YELLOW}🔧 Setting up Aptos profile...${NC}"
    
    # Create or update aptos profile
    aptos init --profile btc_lending --private-key "$PRIVATE_KEY" --rest-url "$REST_URL" --assume-yes
    
    log "${GREEN}✅ Aptos profile configured${NC}"
}

# Function to publish package
publish_package() {
    log "${YELLOW}📦 Publishing package...${NC}"
    
    if ! aptos move publish --profile btc_lending --package-dir . --named-addresses btc_lending_platform="$WALLET_ADDRESS"; then
        log "${RED}❌ Package publication failed${NC}"
        exit 1
    fi
    
    log "${GREEN}✅ Package published successfully${NC}"
}

# Function to run deployment script
run_deployment_script() {
    log "${YELLOW}🚀 Running deployment script...${NC}"
    
    if ! aptos move run --profile btc_lending --function-id "$WALLET_ADDRESS::deploy::deploy"; then
        log "${RED}❌ Deployment script failed${NC}"
        exit 1
    fi
    
    log "${GREEN}✅ Deployment script executed successfully${NC}"
}

# Function to verify deployment
verify_deployment() {
    log "${YELLOW}🔍 Verifying deployment...${NC}"
    
    # Get account resources
    aptos account list --query resources --account "$WALLET_ADDRESS" --profile btc_lending > "$DEPLOYMENT_DIR/account_resources.json"
    
    # Check if contracts exist
    local contracts=("interest_rate_model" "collateral_vault" "loan_manager" "ctrl_btc_token" "ln_btc_token")
    local all_verified=true
    
    for contract in "${contracts[@]}"; do
        if aptos account list --query resources --account "$WALLET_ADDRESS" --profile btc_lending | grep -q "$contract"; then
            log "${GREEN}✅ $contract verified${NC}"
        else
            log "${RED}❌ $contract not found${NC}"
            all_verified=false
        fi
    done
    
    if [ "$all_verified" = true ]; then
        log "${GREEN}✅ All contracts verified successfully${NC}"
    else
        log "${RED}❌ Some contracts failed verification${NC}"
        exit 1
    fi
}

# Function to store deployment data
store_deployment_data() {
    log "${YELLOW}💾 Storing deployment data...${NC}"
    
    # Create deployment info file
    cat > "$DEPLOYMENT_DIR/deployment_info.json" << EOF
{
  "deployment": {
    "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "network": "$NETWORK",
    "rest_url": "$REST_URL",
    "explorer_url": "$EXPLORER_URL",
    "wallet_address": "$WALLET_ADDRESS",
    "deployment_log": "$DEPLOYMENT_LOG"
  },
  "contracts": {
    "interest_rate_model": "$WALLET_ADDRESS::interest_rate_model",
    "collateral_vault": "$WALLET_ADDRESS::collateral_vault",
    "loan_manager": "$WALLET_ADDRESS::loan_manager",
    "ctrl_btc_token": "$WALLET_ADDRESS::ctrl_btc_token",
    "ln_btc_token": "$WALLET_ADDRESS::ln_btc_token"
  },
  "package": {
    "name": "btc_lending_platform",
    "version": "1.0.0",
    "package_address": "$WALLET_ADDRESS"
  }
}
EOF

    log "${GREEN}✅ Deployment data stored in $DEPLOYMENT_DIR/${NC}"
}

# Function to run ABI and bytecode extraction
extract_abi_bytecode() {
    log "${YELLOW}📄 Extracting ABI and bytecode...${NC}"
    
    # Run the ABI extraction script
    if [ -f "extract_deployment_data.sh" ]; then
        chmod +x extract_deployment_data.sh
        ./extract_deployment_data.sh "$WALLET_ADDRESS" "$NETWORK" "$DEPLOYMENT_DIR"
    else
        log "${YELLOW}⚠️  ABI extraction script not found, creating basic extraction...${NC}"
        
        # Create basic ABI extraction
        aptos account list --query resources --account "$WALLET_ADDRESS" --profile btc_lending > "$DEPLOYMENT_DIR/contract_abis.json"
    fi
    
    log "${GREEN}✅ ABI and bytecode extracted${NC}"
}

# Main deployment process
main() {
    log "${BLUE}Starting BTC Lending Platform deployment...${NC}"
    
    # Step 1: Check prerequisites
    check_aptos_cli
    
    # Step 2: Update configuration
    update_move_toml
    
    # Step 3: Compile contracts
    compile_contracts
    
    # Step 4: Setup profile
    setup_aptos_profile
    
    # Step 5: Publish package
    publish_package
    
    # Step 6: Run deployment script
    run_deployment_script
    
    # Step 7: Verify deployment
    verify_deployment
    
    # Step 8: Store deployment data
    store_deployment_data
    
    # Step 9: Extract ABI and bytecode
    extract_abi_bytecode
    
    # Success message
    echo ""
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}📋 Contract Addresses:${NC}"
    echo "InterestRateModel: $WALLET_ADDRESS::interest_rate_model"
    echo "CollateralVault: $WALLET_ADDRESS::collateral_vault"
    echo "LoanManager: $WALLET_ADDRESS::loan_manager"
    echo "ctrlBTC Token: $WALLET_ADDRESS::ctrl_btc_token"
    echo "lnBTC Token: $WALLET_ADDRESS::ln_btc_token"
    echo ""
    echo -e "${YELLOW}📁 Deployment Data:${NC}"
    echo "Deployment Directory: $DEPLOYMENT_DIR"
    echo "Deployment Log: $DEPLOYMENT_LOG"
    echo "Explorer: $EXPLORER_URL/account/$WALLET_ADDRESS"
    echo ""
    echo -e "${YELLOW}📖 Next Steps:${NC}"
    echo "1. Verify contracts on Aptos Explorer"
    echo "2. Test the platform with small amounts"
    echo "3. Set up monitoring and alerts"
    echo "4. Configure frontend integration"
    echo ""
    echo -e "${GREEN}🎉 Your BTC Lending Platform is now live on $NETWORK!${NC}"
}

# Run main function
main "$@"



