import React from 'react';
import { Button, Space, Typography } from 'antd';
import { WalletOutlined, DisconnectOutlined } from '@ant-design/icons';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const { Text } = Typography;

const WalletConnection = () => {
  const { connect, disconnect, account, connected } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
      {connected ? (
        <Space direction="vertical" size="middle">
          <div>
            <span className="status-indicator status-connected"></span>
            <Text strong>Wallet Connected</Text>
          </div>
          <div>
            <Text code>{account?.address}</Text>
          </div>
          <Button 
            type="primary" 
            danger 
            icon={<DisconnectOutlined />}
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </Space>
      ) : (
        <Space direction="vertical" size="middle">
          <div>
            <span className="status-indicator status-disconnected"></span>
            <Text>Wallet Not Connected</Text>
          </div>
          <Button 
            type="primary" 
            icon={<WalletOutlined />}
            onClick={handleConnect}
            size="large"
          >
            Connect Wallet
          </Button>
        </Space>
      )}
    </div>
  );
};

export default WalletConnection;

