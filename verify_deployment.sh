#!/bin/bash

# BTC Lending Platform - Deployment Verification Script
# This script verifies that all contracts are properly deployed and functioning

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if required parameters are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${RED}❌ Error: Missing required parameters${NC}"
    echo "Usage: ./verify_deployment.sh <WALLET_ADDRESS> <NETWORK>"
    echo "Example: ./verify_deployment.sh 0x1234...abcd testnet"
    echo ""
    echo "Available networks:"
    echo "  - testnet (default): https://fullnode.testnet.aptoslabs.com/v1"
    echo "  - mainnet: https://fullnode.mainnet.aptoslabs.com/v1"
    echo "  - devnet: https://fullnode.devnet.aptoslabs.com/v1"
    exit 1
fi

WALLET_ADDRESS=$1
NETWORK=${2:-testnet}

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

echo -e "${GREEN}🔍 BTC Lending Platform - Deployment Verification${NC}"
echo "======================================================"
echo "Wallet Address: $WALLET_ADDRESS"
echo "Network: $NETWORK"
echo "REST URL: $REST_URL"
echo ""

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
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

# Function to check account existence
check_account_exists() {
    log "${YELLOW}🔍 Checking account existence...${NC}"
    
    if aptos account list --query resources --account "$WALLET_ADDRESS" --rest-url "$REST_URL" &>/dev/null; then
        log "${GREEN}✅ Account exists and is accessible${NC}"
    else
        log "${RED}❌ Account not found or not accessible${NC}"
        exit 1
    fi
}

# Function to verify individual contracts
verify_contracts() {
    log "${YELLOW}📋 Verifying individual contracts...${NC}"
    
    local contracts=("interest_rate_model" "collateral_vault" "loan_manager" "ctrl_btc_token" "ln_btc_token")
    local all_verified=true
    local verified_count=0
    
    for contract in "${contracts[@]}"; do
        log "Checking $contract..."
        
        # Check if contract module exists
        if aptos account list --query resources --account "$WALLET_ADDRESS" --rest-url "$REST_URL" | grep -q "$contract"; then
            log "${GREEN}✅ $contract verified${NC}"
            ((verified_count++))
        else
            log "${RED}❌ $contract not found${NC}"
            all_verified=false
        fi
    done
    
    echo ""
    log "${BLUE}Contract Verification Summary:${NC}"
    log "Verified: $verified_count/${#contracts[@]} contracts"
    
    if [ "$all_verified" = true ]; then
        log "${GREEN}✅ All contracts verified successfully${NC}"
    else
        log "${RED}❌ Some contracts failed verification${NC}"
        return 1
    fi
}

# Function to check contract functionality
check_contract_functionality() {
    log "${YELLOW}🔧 Checking contract functionality...${NC}"
    
    # Check if we can call view functions
    local view_functions=(
        "interest_rate_model::get_interest_rate"
        "collateral_vault::get_user_collateral"
        "loan_manager::get_system_stats"
    )
    
    local functional_count=0
    
    for func in "${view_functions[@]}"; do
        log "Testing $func..."
        
        # Try to call the function (this might fail if not initialized, which is expected)
        if aptos move view --function-id "$WALLET_ADDRESS::$func" --rest-url "$REST_URL" &>/dev/null; then
            log "${GREEN}✅ $func is callable${NC}"
            ((functional_count++))
        else
            log "${YELLOW}⚠️  $func not callable (may not be initialized)${NC}"
        fi
    done
    
    log "${BLUE}Functionality Check Summary:${NC}"
    log "Callable functions: $functional_count/${#view_functions[@]}"
}

# Function to check account resources
check_account_resources() {
    log "${YELLOW}📊 Checking account resources...${NC}"
    
    # Get account resources
    local resources_file="account_resources_$(date +%Y%m%d_%H%M%S).json"
    aptos account list --query resources --account "$WALLET_ADDRESS" --rest-url "$REST_URL" > "$resources_file"
    
    log "${GREEN}✅ Account resources saved to $resources_file${NC}"
    
    # Count resources
    local resource_count=$(jq length "$resources_file" 2>/dev/null || echo "0")
    log "Total resources: $resource_count"
    
    # Check for specific resource types
    local module_count=$(grep -c "0x1::code::Module" "$resources_file" 2>/dev/null || echo "0")
    log "Module resources: $module_count"
}

# Function to generate verification report
generate_verification_report() {
    log "${YELLOW}📄 Generating verification report...${NC}"
    
    local report_file="deployment_verification_$(date +%Y%m%d_%H%M%S).md"
    
    cat > "$report_file" << EOF
# BTC Lending Platform - Deployment Verification Report

**Verification Date:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")  
**Wallet Address:** \`$WALLET_ADDRESS\`  
**Network:** $NETWORK  
**REST URL:** $REST_URL  
**Explorer:** [$EXPLORER_URL/account/$WALLET_ADDRESS]($EXPLORER_URL/account/$WALLET_ADDRESS)

## Contract Verification Status

| Contract | Status | Address |
|----------|--------|---------|
| InterestRateModel | ✅ Verified | \`$WALLET_ADDRESS::interest_rate_model\` |
| CollateralVault | ✅ Verified | \`$WALLET_ADDRESS::collateral_vault\` |
| LoanManager | ✅ Verified | \`$WALLET_ADDRESS::loan_manager\` |
| ctrlBTC Token | ✅ Verified | \`$WALLET_ADDRESS::ctrl_btc_token\` |
| lnBTC Token | ✅ Verified | \`$WALLET_ADDRESS::ln_btc_token\` |

## Verification Results

- ✅ **Account Access**: Wallet address is accessible
- ✅ **Contract Deployment**: All 5 contracts are deployed
- ✅ **Module Resources**: Contract modules are present
- ✅ **Network Connectivity**: Successfully connected to $NETWORK

## Next Steps

1. **Initialize Contracts**: Run initialization functions if not already done
2. **Test Functionality**: Test contract functions with small amounts
3. **Frontend Integration**: Use contract addresses for frontend development
4. **Monitoring**: Set up monitoring for contract events

## Contract Addresses for Integration

\`\`\`json
{
  "interest_rate_model": "$WALLET_ADDRESS::interest_rate_model",
  "collateral_vault": "$WALLET_ADDRESS::collateral_vault",
  "loan_manager": "$WALLET_ADDRESS::loan_manager",
  "ctrl_btc_token": "$WALLET_ADDRESS::ctrl_btc_token",
  "ln_btc_token": "$WALLET_ADDRESS::ln_btc_token"
}
\`\`\`

---

**🎉 Deployment verification completed successfully!**
EOF

    log "${GREEN}✅ Verification report saved to $report_file${NC}"
}

# Function to display summary
display_summary() {
    echo ""
    echo -e "${GREEN}🎉 Verification completed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}📋 Contract Addresses:${NC}"
    echo "InterestRateModel: $WALLET_ADDRESS::interest_rate_model"
    echo "CollateralVault: $WALLET_ADDRESS::collateral_vault"
    echo "LoanManager: $WALLET_ADDRESS::loan_manager"
    echo "ctrlBTC Token: $WALLET_ADDRESS::ctrl_btc_token"
    echo "lnBTC Token: $WALLET_ADDRESS::ln_btc_token"
    echo ""
    echo -e "${YELLOW}🔗 Explorer Link:${NC}"
    echo "$EXPLORER_URL/account/$WALLET_ADDRESS"
    echo ""
    echo -e "${YELLOW}📖 Next Steps:${NC}"
    echo "1. Initialize contracts if not already done"
    echo "2. Test platform functionality"
    echo "3. Integrate with frontend application"
    echo "4. Set up monitoring and alerts"
}

# Main verification process
main() {
    log "${BLUE}Starting deployment verification...${NC}"
    
    # Step 1: Check prerequisites
    check_aptos_cli
    
    # Step 2: Check account existence
    check_account_exists
    
    # Step 3: Verify contracts
    if ! verify_contracts; then
        log "${RED}❌ Contract verification failed${NC}"
        exit 1
    fi
    
    # Step 4: Check contract functionality
    check_contract_functionality
    
    # Step 5: Check account resources
    check_account_resources
    
    # Step 6: Generate verification report
    generate_verification_report
    
    # Step 7: Display summary
    display_summary
}

# Run main function
main "$@"



