// BTC Lending Platform - Simple Frontend
// This is a minimal HTML/JavaScript frontend that works without build tools

// Configuration - Update these after deployment
const CONFIG = {
    // Replace with your actual wallet address after deployment
    WALLET_ADDRESS: "0x5e25225f13c79a741fa58f8db5c6c8aa4da5f5113553592c797a8d1588ddf01b",
    
    // Contract addresses
    CONTRACTS: {
        INTEREST_RATE_MODEL: "YOUR_WALLET_ADDRESS::interest_rate_model",
        COLLATERAL_VAULT: "YOUR_WALLET_ADDRESS::collateral_vault",
        LOAN_MANAGER: "YOUR_WALLET_ADDRESS::loan_manager",
        CTRL_BTC_TOKEN: "YOUR_WALLET_ADDRESS::ctrl_btc_token",
        LNBTC_TOKEN: "YOUR_WALLET_ADDRESS::ln_btc_token"
    },
    
    // Network configuration
    NETWORK: {
        REST_URL: "https://fullnode.testnet.aptoslabs.com/v1",
        EXPLORER_URL: "https://explorer.testnet.aptoslabs.com"
    },
    
    // Interest rates
    INTEREST_RATES: {
        30: 5,  // 5% for 30% LTV
        45: 8,  // 8% for 45% LTV
        60: 10  // 10% for 60% LTV
    },
    
    MAX_LTV_RATIO: 60
};

// Global state
let wallet = null;
let client = null;
let isConnected = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('BTC Lending Platform Frontend Initialized');
    
    // Update contract addresses in UI
    updateContractAddresses();
    
    // Initialize Aptos client
    if (typeof Aptos !== 'undefined') {
        client = new Aptos.AptosClient(CONFIG.NETWORK.REST_URL);
        console.log('Aptos client initialized');
    } else {
        console.error('Aptos SDK not loaded');
        showAlert('Aptos SDK not loaded. Please refresh the page.', 'error');
    }
});

// Update contract addresses in the UI
function updateContractAddresses() {
    const elements = [
        'interest-rate-model',
        'collateral-vault', 
        'loan-manager',
        'ctrl-btc-token',
        'lnbtc-token'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = CONFIG.CONTRACTS[id.toUpperCase().replace('-', '_')];
        }
    });
}

// Wallet connection functions
async function connectWallet() {
    try {
        if (typeof window.aptos === 'undefined') {
            showAlert('Aptos wallet not found. Please install Petra or Martian wallet.', 'error');
            return;
        }

        // Request connection
        const response = await window.aptos.connect();
        wallet = response;
        isConnected = true;
        
        // Update UI
        document.getElementById('wallet-disconnected').classList.add('hidden');
        document.getElementById('wallet-connected').classList.remove('hidden');
        document.getElementById('wallet-address').textContent = wallet.address;
        
        showAlert('Wallet connected successfully!', 'info');
        
        // Load balances
        await loadBalances();
        
    } catch (error) {
        console.error('Failed to connect wallet:', error);
        showAlert('Failed to connect wallet: ' + error.message, 'error');
    }
}

async function disconnectWallet() {
    try {
        if (window.aptos && window.aptos.disconnect) {
            await window.aptos.disconnect();
        }
        
        wallet = null;
        isConnected = false;
        
        // Update UI
        document.getElementById('wallet-connected').classList.add('hidden');
        document.getElementById('wallet-disconnected').classList.remove('hidden');
        
        showAlert('Wallet disconnected', 'info');
        
    } catch (error) {
        console.error('Failed to disconnect wallet:', error);
        showAlert('Failed to disconnect wallet: ' + error.message, 'error');
    }
}

// Load user balances and system stats
async function loadBalances() {
    if (!isConnected || !client) {
        return;
    }

    try {
        // For demo purposes, we'll show placeholder data
        // In a real implementation, you would call the contract view functions
        
        document.getElementById('total-collateral').textContent = '0.00000000 BTC';
        document.getElementById('available-collateral').textContent = '0.00000000 BTC';
        document.getElementById('total-loans').textContent = '0';
        document.getElementById('active-loans').textContent = '0';
        document.getElementById('total-debt').textContent = '0.00 BTC';
        document.getElementById('total-collateral-system').textContent = '0.00 BTC';
        
        console.log('Balances loaded (demo data)');
        
    } catch (error) {
        console.error('Failed to load balances:', error);
        showAlert('Failed to load balances: ' + error.message, 'error');
    }
}

// Collateral management functions
async function depositCollateral() {
    if (!isConnected) {
        showAlert('Please connect your wallet first', 'error');
        return;
    }

    const amount = document.getElementById('deposit-amount').value;
    if (!amount || parseFloat(amount) <= 0) {
        showAlert('Please enter a valid amount', 'error');
        return;
    }

    try {
        showAlert('Deposit transaction submitted (demo mode)', 'info');
        
        // In a real implementation, you would:
        // 1. Convert amount to satoshis
        // 2. Create transaction payload
        // 3. Sign and submit transaction
        // 4. Wait for confirmation
        
        console.log('Deposit amount:', amount, 'BTC');
        
        // Clear form
        document.getElementById('deposit-amount').value = '';
        
    } catch (error) {
        console.error('Deposit failed:', error);
        showAlert('Deposit failed: ' + error.message, 'error');
    }
}

async function withdrawCollateral() {
    if (!isConnected) {
        showAlert('Please connect your wallet first', 'error');
        return;
    }

    const amount = document.getElementById('withdraw-amount').value;
    if (!amount || parseFloat(amount) <= 0) {
        showAlert('Please enter a valid amount', 'error');
        return;
    }

    try {
        showAlert('Withdrawal transaction submitted (demo mode)', 'info');
        
        // In a real implementation, you would:
        // 1. Convert amount to satoshis
        // 2. Create transaction payload
        // 3. Sign and submit transaction
        // 4. Wait for confirmation
        
        console.log('Withdrawal amount:', amount, 'BTC');
        
        // Clear form
        document.getElementById('withdraw-amount').value = '';
        
    } catch (error) {
        console.error('Withdrawal failed:', error);
        showAlert('Withdrawal failed: ' + error.message, 'error');
    }
}

// Loan management functions
async function createLoan() {
    if (!isConnected) {
        showAlert('Please connect your wallet first', 'error');
        return;
    }

    const collateralAmount = document.getElementById('loan-collateral-amount').value;
    const ltvRatio = document.getElementById('ltv-ratio').value;

    if (!collateralAmount || parseFloat(collateralAmount) <= 0) {
        showAlert('Please enter a valid collateral amount', 'error');
        return;
    }

    if (!ltvRatio) {
        showAlert('Please select an LTV ratio', 'error');
        return;
    }

    try {
        const interestRate = CONFIG.INTEREST_RATES[ltvRatio];
        const maxLoanAmount = (parseFloat(collateralAmount) * parseInt(ltvRatio)) / 100;
        
        showAlert(`Loan creation submitted (demo mode)\nCollateral: ${collateralAmount} BTC\nLTV: ${ltvRatio}%\nInterest: ${interestRate}%\nMax Loan: ${maxLoanAmount.toFixed(8)} BTC`, 'info');
        
        // In a real implementation, you would:
        // 1. Convert amounts to satoshis
        // 2. Create transaction payload
        // 3. Sign and submit transaction
        // 4. Wait for confirmation
        
        console.log('Loan creation:', {
            collateralAmount,
            ltvRatio,
            interestRate,
            maxLoanAmount
        });
        
        // Clear form
        document.getElementById('loan-collateral-amount').value = '';
        
    } catch (error) {
        console.error('Loan creation failed:', error);
        showAlert('Loan creation failed: ' + error.message, 'error');
    }
}

async function repayLoan() {
    if (!isConnected) {
        showAlert('Please connect your wallet first', 'error');
        return;
    }

    const loanId = document.getElementById('loan-id').value;
    const repaymentAmount = document.getElementById('repay-amount').value;

    if (!loanId || parseInt(loanId) <= 0) {
        showAlert('Please enter a valid loan ID', 'error');
        return;
    }

    if (!repaymentAmount || parseFloat(repaymentAmount) <= 0) {
        showAlert('Please enter a valid repayment amount', 'error');
        return;
    }

    try {
        showAlert(`Loan repayment submitted (demo mode)\nLoan ID: ${loanId}\nAmount: ${repaymentAmount} BTC`, 'info');
        
        // In a real implementation, you would:
        // 1. Convert amounts to satoshis
        // 2. Create transaction payload
        // 3. Sign and submit transaction
        // 4. Wait for confirmation
        
        console.log('Loan repayment:', {
            loanId,
            repaymentAmount
        });
        
        // Clear form
        document.getElementById('loan-id').value = '';
        document.getElementById('repay-amount').value = '';
        
    } catch (error) {
        console.error('Loan repayment failed:', error);
        showAlert('Loan repayment failed: ' + error.message, 'error');
    }
}

// Utility functions
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insert at top of content
    const content = document.querySelector('.content');
    content.insertBefore(alert, content.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
}

// Format BTC amount for display
function formatBTC(amount) {
    return parseFloat(amount).toFixed(8);
}

// Convert BTC to satoshis
function btcToSatoshis(btc) {
    return Math.floor(parseFloat(btc) * 100000000);
}

// Convert satoshis to BTC
function satoshisToBTC(satoshis) {
    return parseFloat(satoshis) / 100000000;
}

// Initialize when page loads
console.log('BTC Lending Platform Frontend Loaded');
console.log('Configuration:', CONFIG);

