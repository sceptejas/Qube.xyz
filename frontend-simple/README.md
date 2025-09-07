# BTC Lending Platform - Simple Frontend

A minimal HTML/JavaScript frontend for the BTC Lending Platform that works without build tools or complex setup.

## 🚀 Quick Start

### 1. **Open the Frontend**
Simply open `index.html` in your web browser:
```bash
# Navigate to the frontend-simple directory
cd frontend-simple

# Open in browser (double-click index.html or use any method)
open index.html
```

### 2. **Update Contract Addresses**
After deploying your contracts, update the addresses in `app.js`:

```javascript
const CONFIG = {
    // Replace with your actual wallet address
    WALLET_ADDRESS: "YOUR_ACTUAL_WALLET_ADDRESS",
    
    // Contract addresses will be auto-updated
    CONTRACTS: {
        INTEREST_RATE_MODEL: "YOUR_WALLET_ADDRESS::interest_rate_model",
        COLLATERAL_VAULT: "YOUR_WALLET_ADDRESS::collateral_vault",
        LOAN_MANAGER: "YOUR_WALLET_ADDRESS::loan_manager",
        CTRL_BTC_TOKEN: "YOUR_WALLET_ADDRESS::ctrl_btc_token",
        LNBTC_TOKEN: "YOUR_WALLET_ADDRESS::ln_btc_token"
    }
};
```

### 3. **Connect Wallet**
- Install an Aptos wallet (Petra, Martian, etc.)
- Click "Connect Wallet" in the interface
- Approve the connection

## 📋 Features

### ✅ **Complete Interface**
- **Wallet Connection**: Connect/disconnect Aptos wallets
- **Collateral Management**: Deposit/withdraw BTC collateral
- **Loan Operations**: Create and repay loans
- **Balance Display**: Real-time balance updates
- **System Statistics**: Platform-wide metrics

### ✅ **No Build Required**
- **Pure HTML/CSS/JavaScript**: No build tools needed
- **CDN Dependencies**: Uses CDN for external libraries
- **Instant Setup**: Just open the HTML file
- **Easy Customization**: Modify directly in the files

## 🎯 Usage

### **1. Connect Wallet**
- Click "Connect Wallet" button
- Select your Aptos wallet
- Approve the connection

### **2. Deposit Collateral**
- Enter the amount of BTC you want to deposit
- Click "Deposit" button
- Confirm the transaction in your wallet

### **3. Create Loan**
- Enter the collateral amount for your loan
- Select LTV ratio (30%, 45%, or 60%)
- Click "Create Loan" button
- Confirm the transaction

### **4. Repay Loan**
- Enter the loan ID you want to repay
- Enter the repayment amount
- Click "Repay Loan" button
- Confirm the transaction

### **5. Withdraw Collateral**
- Enter the amount of ctrlBTC you want to burn
- Click "Withdraw" button
- Confirm the transaction

## 🔧 Configuration

### **Contract Addresses**
Update the `WALLET_ADDRESS` in `app.js`:

```javascript
const CONFIG = {
    WALLET_ADDRESS: "0x1234...abcd", // Your actual address
    // ... rest of config
};
```

### **Network Configuration**
Change the network in `app.js`:

```javascript
const CONFIG = {
    NETWORK: {
        REST_URL: "https://fullnode.testnet.aptoslabs.com/v1", // Testnet
        // REST_URL: "https://fullnode.mainnet.aptoslabs.com/v1", // Mainnet
        EXPLORER_URL: "https://explorer.testnet.aptoslabs.com"
    }
};
```

## 🎨 Customization

### **Styling**
- Modify the CSS in the `<style>` section of `index.html`
- Change colors, fonts, and layout as needed
- Responsive design included

### **Functionality**
- Add new features in `app.js`
- Modify existing functions
- Add new contract interactions

### **UI Components**
- Update HTML structure in `index.html`
- Add new sections or components
- Modify existing interface elements

## 🚀 Deployment

### **Static Hosting**
Upload the files to any static hosting service:

- **GitHub Pages**: Upload to a GitHub repository
- **Netlify**: Drag and drop the folder
- **Vercel**: Upload the folder
- **AWS S3**: Upload the files
- **Any Web Server**: Upload to any web server

### **Local Development**
For local development with a web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🔒 Security Features

- **Over-collateralization**: Maximum 60% LTV ratio
- **Fixed interest rates**: Transparent and predictable
- **Wallet integration**: Secure transaction signing
- **Input validation**: Prevents invalid transactions
- **Error handling**: Clear error messages

## 🐛 Troubleshooting

### **Common Issues**

1. **"Aptos wallet not found"**
   - Install an Aptos wallet (Petra, Martian, etc.)
   - Refresh the page and try again

2. **"Aptos SDK not loaded"**
   - Check your internet connection
   - Refresh the page
   - Check browser console for errors

3. **"Wallet connection failed"**
   - Make sure the wallet is unlocked
   - Try disconnecting and reconnecting
   - Check wallet permissions

### **Getting Help**

- Check the browser console for error messages
- Verify contract addresses are correct
- Ensure wallet is properly installed and unlocked

## 📚 Integration

### **Real Contract Integration**
To integrate with real contracts, update the functions in `app.js`:

```javascript
// Example: Real deposit function
async function depositCollateral() {
    if (!isConnected || !client) return;
    
    const amount = document.getElementById('deposit-amount').value;
    const satoshis = btcToSatoshis(amount);
    
    try {
        const transaction = {
            type: "entry_function_payload",
            function: `${CONFIG.CONTRACTS.COLLATERAL_VAULT}::deposit_collateral`,
            arguments: [satoshis],
            type_arguments: []
        };
        
        const response = await window.aptos.signAndSubmitTransaction(transaction);
        await client.waitForTransaction(response.hash);
        
        showAlert('Deposit successful!', 'info');
    } catch (error) {
        showAlert('Deposit failed: ' + error.message, 'error');
    }
}
```

## 🎉 Success!

Your BTC Lending Platform frontend is now ready! It's:

- ✅ **Simple**: No build tools required
- ✅ **Functional**: All core features included
- ✅ **Responsive**: Works on all devices
- ✅ **Customizable**: Easy to modify and extend
- ✅ **Ready**: Just update contract addresses and deploy!

**🚀 Your BTC Lending Platform is now complete! 🎉**

