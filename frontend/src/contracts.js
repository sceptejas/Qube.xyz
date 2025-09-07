// Contract addresses and ABIs for BTC Lending Platform
// Replace YOUR_WALLET_ADDRESS with your actual deployed wallet address

export const CONTRACT_ADDRESSES = {
  // Replace with your actual wallet address after deployment
  WALLET_ADDRESS: "YOUR_WALLET_ADDRESS", // Update this after deployment
  
  INTEREST_RATE_MODEL: "YOUR_WALLET_ADDRESS::interest_rate_model",
  COLLATERAL_VAULT: "YOUR_WALLET_ADDRESS::collateral_vault", 
  LOAN_MANAGER: "YOUR_WALLET_ADDRESS::loan_manager",
  CTRL_BTC_TOKEN: "YOUR_WALLET_ADDRESS::ctrl_btc_token",
  LNBTC_TOKEN: "YOUR_WALLET_ADDRESS::ln_btc_token"
};

// Contract function signatures for interaction
export const CONTRACT_FUNCTIONS = {
  // Interest Rate Model
  GET_INTEREST_RATE: "get_interest_rate",
  UPDATE_INTEREST_RATE: "update_interest_rate",
  
  // Collateral Vault
  DEPOSIT_COLLATERAL: "deposit_collateral",
  WITHDRAW_COLLATERAL: "withdraw_collateral",
  GET_USER_COLLATERAL: "get_user_collateral",
  GET_USER_AVAILABLE_COLLATERAL: "get_user_available_collateral",
  
  // Loan Manager
  CREATE_LOAN: "create_loan",
  REPAY_LOAN: "repay_loan",
  CLOSE_LOAN: "close_loan",
  GET_LOAN: "get_loan",
  GET_BORROWER_LOANS: "get_borrower_loans",
  GET_SYSTEM_STATS: "get_system_stats",
  CALCULATE_INTEREST_OWED: "calculate_interest_owed"
};

// Default interest rates based on LTV ratios
export const INTEREST_RATES = {
  30: 5,  // 5% for 30% LTV
  45: 8,  // 8% for 45% LTV  
  60: 10  // 10% for 60% LTV
};

// Maximum LTV ratio
export const MAX_LTV_RATIO = 60;

// Loan states
export const LOAN_STATES = {
  ACTIVE: 1,
  REPAID: 2,
  CLOSED: 3,
  DEFAULTED: 4
};

