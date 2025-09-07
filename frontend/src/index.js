import React from 'react';
import ReactDOM from 'react-dom/client';
import { WalletProvider } from '@aptos-labs/wallet-adapter-react';
import { AntDesign } from '@aptos-labs/wallet-adapter-ant-design';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Configure wallet adapters
const wallets = [new AntDesign()];

root.render(
  <React.StrictMode>
    <WalletProvider
      plugins={wallets}
      autoConnect={true}
    >
      <App />
    </WalletProvider>
  </React.StrictMode>
);

