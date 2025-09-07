# BTC Lending Platform - Frontend

A minimal and simple React frontend for the BTC Lending Platform built on Aptos blockchain.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Aptos wallet (Petra, Martian, or other compatible wallet)

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update contract addresses:**
   - Open `src/contracts.js`
   - Replace `YOUR_WALLET_ADDRESS` with your actual deployed wallet address
   - Save the file

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - Connect your Aptos wallet
   - Start using the platform!

## 📋 Features

### ✅ **Wallet Integration**
- Connect/disconnect Aptos wallets
- Real-time wallet status
- Transaction signing and submission

### ✅ **Collateral Management**
- Deposit BTC collateral
- Withdraw BTC collateral
- View collateral balances
- Real-time balance updates

### ✅ **Loan Operations**
- Create new loans
- Repay existing loans
- View loan details
- Interest rate calculations

### ✅ **System Statistics**
- Total loans count
- Active loans count
- Total debt amount
- Total collateral amount

## 🔧 Configuration

### Contract Addresses
Update the contract addresses in `src/contracts.js`:

```javascript
export const CONTRACT_ADDRESSES = {
  WALLET_ADDRESS: "YOUR_ACTUAL_WALLET_ADDRESS",
  INTEREST_RATE_MODEL: "YOUR_WALLET_ADDRESS::interest_rate_model",
  COLLATERAL_VAULT: "YOUR_WALLET_ADDRESS::collateral_vault",
  LOAN_MANAGER: "YOUR_WALLET_ADDRESS::loan_manager",
  CTRL_BTC_TOKEN: "YOUR_WALLET_ADDRESS::ctrl_btc_token",
  LNBTC_TOKEN: "YOUR_WALLET_ADDRESS::ln_btc_token"
};
```

### Network Configuration
The frontend is configured for Aptos testnet by default. To change networks, update the client URL in `src/hooks/useContract.js`:

```javascript
// For testnet (default)
const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');

// For mainnet
const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/v1');

// For devnet
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');
```

## 🏗️ Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── WalletConnection.js
│   │   ├── BalanceCard.js
│   │   ├── CollateralActions.js
│   │   └── LoanActions.js
│   ├── hooks/
│   │   └── useContract.js
│   ├── contracts.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎯 Usage Guide

### 1. **Connect Wallet**
- Click "Connect Wallet" button
- Select your Aptos wallet (Petra, Martian, etc.)
- Approve the connection

### 2. **Deposit Collateral**
- Enter the amount of BTC you want to deposit
- Click "Deposit" button
- Confirm the transaction in your wallet
- Receive ctrlBTC tokens representing your collateral

### 3. **Create Loan**
- Enter the collateral amount for your loan
- Select LTV ratio (30%, 45%, or 60%)
- Click "Create Loan" button
- Confirm the transaction
- Receive lnBTC tokens representing your loan

### 4. **Repay Loan**
- Enter the loan ID you want to repay
- Enter the repayment amount
- Click "Repay Loan" button
- Confirm the transaction

### 5. **Withdraw Collateral**
- Enter the amount of ctrlBTC you want to burn
- Click "Withdraw" button
- Confirm the transaction
- Receive your BTC back

## 🔒 Security Features

- **Over-collateralization**: Maximum 60% LTV ratio
- **Fixed interest rates**: Transparent and predictable
- **Wallet integration**: Secure transaction signing
- **Input validation**: Prevents invalid transactions
- **Error handling**: Clear error messages and recovery

## 🛠️ Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Customization

The frontend is designed to be minimal and simple. You can easily customize:

- **Styling**: Modify `src/index.css` for custom styles
- **Components**: Update components in `src/components/`
- **Contract interactions**: Modify `src/hooks/useContract.js`
- **UI layout**: Update `src/App.js`

## 🐛 Troubleshooting

### Common Issues

1. **"Wallet not connected"**
   - Make sure you have an Aptos wallet installed
   - Refresh the page and try connecting again

2. **"Transaction failed"**
   - Check if you have sufficient APT for gas fees
   - Verify the contract addresses are correct
   - Ensure you have sufficient balance for the operation

3. **"Contract not found"**
   - Verify the contract addresses in `src/contracts.js`
   - Make sure the contracts are deployed
   - Check the network configuration

### Getting Help

- Check the browser console for error messages
- Verify contract deployment using the verification script
- Check Aptos Explorer for transaction status

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Static Hosting

You can deploy the built files to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `build` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload the `build` folder

## 📚 Integration

### Frontend Integration

The frontend provides a complete interface for the BTC Lending Platform. You can:

- Use it as-is for a complete lending platform
- Integrate components into existing applications
- Customize the UI for your specific needs
- Add additional features and functionality

### API Integration

The frontend uses the Aptos SDK for blockchain interactions. You can extend it with:

- REST API calls for additional data
- WebSocket connections for real-time updates
- Custom hooks for specific functionality
- Additional wallet integrations

## 🎉 Success!

Your BTC Lending Platform frontend is now ready! Connect your wallet and start lending Bitcoin on Aptos! 🚀

