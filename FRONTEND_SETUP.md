# BTC Lending Platform - Frontend Setup Guide

## 🚀 **Quick Setup**

### **1. Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- Aptos wallet (Petra, Martian, or other compatible wallet)

### **2. Install Dependencies**
```bash
cd frontend
npm install
```

### **3. Update Contract Addresses**
After deploying your contracts, update the addresses in `src/contracts.js`:

```javascript
export const CONTRACT_ADDRESSES = {
  WALLET_ADDRESS: "YOUR_ACTUAL_WALLET_ADDRESS", // Replace this
  INTEREST_RATE_MODEL: "YOUR_WALLET_ADDRESS::interest_rate_model",
  COLLATERAL_VAULT: "YOUR_WALLET_ADDRESS::collateral_vault",
  LOAN_MANAGER: "YOUR_WALLET_ADDRESS::loan_manager",
  CTRL_BTC_TOKEN: "YOUR_WALLET_ADDRESS::ctrl_btc_token",
  LNBTC_TOKEN: "YOUR_WALLET_ADDRESS::ln_btc_token"
};
```

### **4. Start Development Server**
```bash
npm start
```

### **5. Open Browser**
Navigate to `http://localhost:3000`

## 📋 **What You Get**

### **✅ Complete Frontend Interface**
- **Wallet Connection**: Connect/disconnect Aptos wallets
- **Collateral Management**: Deposit/withdraw BTC collateral
- **Loan Operations**: Create and repay loans
- **Balance Display**: Real-time balance updates
- **System Statistics**: Platform-wide metrics

### **✅ Key Features**
- **Minimal & Simple**: Clean, easy-to-use interface
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Live balance and transaction updates
- **Error Handling**: Clear error messages and recovery
- **Transaction Confirmation**: Secure wallet integration

## 🎯 **Usage Flow**

1. **Connect Wallet** → Select your Aptos wallet
2. **Deposit Collateral** → Deposit BTC to get ctrlBTC tokens
3. **Create Loan** → Use collateral to create a loan
4. **Repay Loan** → Repay loan to unlock collateral
5. **Withdraw Collateral** → Burn ctrlBTC to get BTC back

## 🔧 **Customization**

### **Styling**
- Modify `src/index.css` for custom styles
- Update colors, fonts, and layout as needed

### **Components**
- Customize components in `src/components/`
- Add new features and functionality

### **Contract Integration**
- Modify `src/hooks/useContract.js` for additional functions
- Add new contract interactions

## 🚀 **Deployment**

### **Build for Production**
```bash
npm run build
```

### **Deploy Options**
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `build` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload `build` folder

## 🎉 **Ready to Use!**

Your BTC Lending Platform frontend is now complete and ready for use! Just update the contract addresses after deployment and you'll have a fully functional lending platform interface.

## 📚 **Next Steps**

1. **Deploy Contracts**: Use the deployment scripts to deploy your contracts
2. **Update Addresses**: Replace `YOUR_WALLET_ADDRESS` with your actual address
3. **Test Platform**: Connect wallet and test all functionality
4. **Customize**: Modify the UI and add features as needed
5. **Deploy Frontend**: Deploy to your preferred hosting platform

**🎉 Your BTC Lending Platform is ready to go live! 🚀**

