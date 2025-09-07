# Qube.xyz a borowing aggregator protocol 
## In Collaboration with TessrApt

This project implements a modern DeFi trading interface for executing the Buy Borrow Die (BBD) strategy using xBTC tokens on the Aptos blockchain.

The interface integrates seamlessly with the Petra wallet and provides a professional dashboard for staking, borrowing, repaying, and tracking portfolio performance.

The strategy assumes a 46% annual appreciation of xBTC, allowing users to borrow 30% Loan-to-Value (LTV) at a low 2% annual interest rate, with refinancing opportunities each year.

🧩 Core Concept

Stake xBTC to lock assets on Aptos.

Borrow against appreciating xBTC collateral (up to 30% LTV).

Accrue Interest at 2% APR on borrowed assets.

Refinance Annually based on asset growth (assumed +46% per year).

Repeat to maximize capital efficiency while maintaining exposure to xBTC.

⚙️ Technical Architecture
System Layers

User Layer

End users interact with the dApp through a modern DeFi dashboard.

Wallet Layer

Petra Wallet for authentication, signing, and transaction broadcasting.

UI Layer (Frontend)

Built using React + TypeScript with modern hooks, context, and responsive glassmorphism design.

Smart Contract Layer

Interacts with xBTC token and borrowing contracts deployed on Aptos.

xBTC Token Address:

0x5e25225f13c79a741fa58f8db5c6c8aa4da5f5113553592c797a8d1588ddf01b


Blockchain Layer

All transactions and state updates occur on Aptos Blockchain.

Architecture Diagram

Flow Explanation:

User ↔ Petra Wallet → Handles wallet connection, signing, and account management.

Petra Wallet ↔ dApp UI → The wallet injects account info, balance, and tx state into the UI.

dApp UI ↔ Smart Contracts → Executes stake, borrow, repay, and refinance functions.

Smart Contracts ↔ Aptos Blockchain → On-chain execution, validation, and state storage.

🖥️ User Interface
Dashboard Sections

Header

App title: xBTC Buy Borrow Die Strategy

Petra wallet connect/disconnect button

Connected address & xBTC balance

Strategy Overview Card

Key metrics displayed:

Annual Appreciation: 46%

Max Borrowing Power: 30% LTV

Interest Rate: 2% APR

Flowchart of yearly cycle (Stake → Borrow → Growth → Refinance).

Position Management Tabs

Stake Tab → Stake xBTC, view staked amount, see borrowing power.

Borrow Tab → Borrow against staked xBTC, view interest, confirm borrow.

Repay Tab → Repay loan (interest only / full repayment).

Portfolio Overview

Current staked amount

Borrowed amount

Accrued interest

Net portfolio value

Time to next refinancing

Analytics Section

Projected asset growth (46% yearly)

Interest accumulation curve

Net worth progression

🔑 Wallet Functions
// Petra Wallet Integration Functions
connectWallet()
getWalletBalance()
stakeXBTC(amount: number)
borrowAgainstStake(amount: number)
repayLoan(amount: number)
getStakedAmount()
getBorrowedAmount()
getInterestOwed()

📊 Sample Data (Demo Mode)
Metric	Value
Staked Amount	1.5 xBTC
Borrowed Amount	0.45 xBTC (30% LTV)
Accrued Interest	0.009 xBTC (2%)
Projected Value (1 yr)	2.19 xBTC (46%)
Available to Reborrow	0.657 xBTC
⚠️ Risk Management

Leveraged positions carry liquidation risk.

Past performance ≠ future returns.

Clear disclosures and disclaimers included in the UI.

Educational tooltips explain staking, borrowing, and refinancing risks.

🎨 Design Style

Dark theme with neon green/blue accents

Glassmorphism UI components

Smooth transitions and responsive design

Professional trading interface aesthetic

🚀 Future Enhancements

Multi-wallet support (Martian, Pontem)

Advanced analytics (PnL, risk simulation)

DAO governance layer for protocol parameters

Mobile app deployment
