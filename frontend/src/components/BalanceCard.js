import React, { useState, useEffect } from 'react';
import { Card, Statistic, Spin, Alert } from 'antd';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useContract } from '../hooks/useContract';

const BalanceCard = () => {
  const { account, connected } = useWallet();
  const { getUserCollateral, getUserAvailableCollateral, getSystemStats } = useContract();
  const [balances, setBalances] = useState({
    userCollateral: 0,
    availableCollateral: 0,
    systemStats: { totalLoans: 0, activeLoans: 0, totalDebt: 0, totalCollateral: 0 }
  });
  const [loading, setLoading] = useState(false);

  const loadBalances = async () => {
    if (!connected || !account) return;
    
    setLoading(true);
    try {
      const [userCollateral, availableCollateral, systemStats] = await Promise.all([
        getUserCollateral(),
        getUserAvailableCollateral(),
        getSystemStats()
      ]);

      setBalances({
        userCollateral,
        availableCollateral,
        systemStats
      });
    } catch (error) {
      console.error('Error loading balances:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalances();
  }, [connected, account]);

  if (!connected) {
    return (
      <Card title="Your Balances" style={{ marginBottom: '24px' }}>
        <Alert 
          message="Please connect your wallet to view balances" 
          type="info" 
          showIcon 
        />
      </Card>
    );
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <Card title="Your Balances" style={{ marginBottom: '16px' }}>
        <Spin spinning={loading}>
          <div className="balance-card">
            <div className="balance-item">
              <span className="balance-label">Total Collateral:</span>
              <span className="balance-value">
                {(balances.userCollateral / 100000000).toFixed(8)} BTC
              </span>
            </div>
            <div className="balance-item">
              <span className="balance-label">Available Collateral:</span>
              <span className="balance-value">
                {(balances.availableCollateral / 100000000).toFixed(8)} BTC
              </span>
            </div>
          </div>
        </Spin>
      </Card>

      <Card title="System Statistics">
        <Spin spinning={loading}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            <Statistic 
              title="Total Loans" 
              value={balances.systemStats.totalLoans} 
            />
            <Statistic 
              title="Active Loans" 
              value={balances.systemStats.activeLoans} 
            />
            <Statistic 
              title="Total Debt" 
              value={(balances.systemStats.totalDebt / 100000000).toFixed(2)} 
              suffix="BTC"
            />
            <Statistic 
              title="Total Collateral" 
              value={(balances.systemStats.totalCollateral / 100000000).toFixed(2)} 
              suffix="BTC"
            />
          </div>
        </Spin>
      </Card>
    </div>
  );
};

export default BalanceCard;

