import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { WalletOutlined, BankOutlined, DollarOutlined } from '@ant-design/icons';
import WalletConnection from './components/WalletConnection';
import BalanceCard from './components/BalanceCard';
import CollateralActions from './components/CollateralActions';
import LoanActions from './components/LoanActions';
import { CONTRACT_ADDRESSES } from './contracts';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function App() {
  return (
    <div className="app-container">
      <div className="main-card">
        <Header className="header">
          <div style={{ textAlign: 'center' }}>
            <Title level={1} style={{ color: 'white', margin: 0 }}>
              <BankOutlined /> BTC Lending Platform
            </Title>
            <Text style={{ color: 'white', fontSize: '16px', opacity: 0.9 }}>
              Simple and Secure Bitcoin Lending on Aptos
            </Text>
          </div>
        </Header>

        <Content className="content">
          {/* Wallet Connection */}
          <WalletConnection />

          {/* Contract Addresses Info */}
          <div className="section">
            <Title level={2}>
              <WalletOutlined /> Contract Addresses
            </Title>
            <div className="contract-info">
              <div><strong>Interest Rate Model:</strong> <span className="contract-address">{CONTRACT_ADDRESSES.INTEREST_RATE_MODEL}</span></div>
              <div><strong>Collateral Vault:</strong> <span className="contract-address">{CONTRACT_ADDRESSES.COLLATERAL_VAULT}</span></div>
              <div><strong>Loan Manager:</strong> <span className="contract-address">{CONTRACT_ADDRESSES.LOAN_MANAGER}</span></div>
              <div><strong>ctrlBTC Token:</strong> <span className="contract-address">{CONTRACT_ADDRESSES.CTRL_BTC_TOKEN}</span></div>
              <div><strong>lnBTC Token:</strong> <span className="contract-address">{CONTRACT_ADDRESSES.LNBTC_TOKEN}</span></div>
            </div>
          </div>

          {/* Main Content Grid */}
          <Row gutter={[24, 24]}>
            {/* Left Column - Balances */}
            <Col xs={24} lg={12}>
              <BalanceCard />
            </Col>

            {/* Right Column - Actions */}
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <CollateralActions />
                <LoanActions />
              </Space>
            </Col>
          </Row>

          {/* Platform Info */}
          <div className="section">
            <Title level={2}>
              <DollarOutlined /> Platform Features
            </Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                  <Title level={4}>Over-Collateralized</Title>
                  <Text type="secondary">Maximum 60% LTV ratio for security</Text>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
                  <Title level={4}>Fixed Rates</Title>
                  <Text type="secondary">30%→5%, 45%→8%, 60%→10% interest rates</Text>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
                  <Title level={4}>Fast & Secure</Title>
                  <Text type="secondary">Built on Aptos blockchain</Text>
                </div>
              </Col>
            </Row>
          </div>

          {/* Instructions */}
          <div className="section">
            <Title level={2}>How to Use</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <Title level={4}>1. Connect Wallet</Title>
                  <Text>Connect your Aptos wallet to interact with the platform</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <Title level={4}>2. Deposit Collateral</Title>
                  <Text>Deposit BTC to receive ctrlBTC tokens representing your collateral</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <Title level={4}>3. Create Loan</Title>
                  <Text>Use your collateral to create a loan and receive lnBTC tokens</Text>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </div>
    </div>
  );
}

export default App;

