import React, { useState } from 'react';
import { Card, Form, InputNumber, Button, message, Space, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useContract } from '../hooks/useContract';

const CollateralActions = () => {
  const { connected } = useWallet();
  const { depositCollateral, withdrawCollateral, loading, error } = useContract();
  const [depositForm] = Form.useForm();
  const [withdrawForm] = Form.useForm();

  const handleDeposit = async (values) => {
    if (!connected) {
      message.error('Please connect your wallet first');
      return;
    }

    try {
      const amount = Math.floor(values.amount * 100000000); // Convert to satoshis
      const txHash = await depositCollateral(amount);
      message.success(`Deposit successful! Transaction: ${txHash}`);
      depositForm.resetFields();
    } catch (err) {
      message.error(`Deposit failed: ${err.message}`);
    }
  };

  const handleWithdraw = async (values) => {
    if (!connected) {
      message.error('Please connect your wallet first');
      return;
    }

    try {
      const amount = Math.floor(values.amount * 100000000); // Convert to satoshis
      const txHash = await withdrawCollateral(amount);
      message.success(`Withdrawal successful! Transaction: ${txHash}`);
      withdrawForm.resetFields();
    } catch (err) {
      message.error(`Withdrawal failed: ${err.message}`);
    }
  };

  if (!connected) {
    return (
      <Card title="Collateral Management">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Please connect your wallet to manage collateral</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Collateral Management">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Deposit Section */}
        <div>
          <h4>Deposit BTC Collateral</h4>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Deposit BTC to receive ctrlBTC tokens. These tokens represent your collateralized BTC.
          </p>
          <Form
            form={depositForm}
            onFinish={handleDeposit}
            layout="inline"
            style={{ marginTop: '16px' }}
          >
            <Form.Item
              name="amount"
              rules={[
                { required: true, message: 'Please enter amount' },
                { type: 'number', min: 0.00000001, message: 'Amount must be greater than 0' }
              ]}
            >
              <InputNumber
                placeholder="Amount in BTC"
                min={0.00000001}
                step={0.00000001}
                precision={8}
                style={{ width: '200px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<PlusOutlined />}
                loading={loading}
              >
                Deposit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Divider />

        {/* Withdraw Section */}
        <div>
          <h4>Withdraw BTC Collateral</h4>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Burn ctrlBTC tokens to withdraw your BTC collateral.
          </p>
          <Form
            form={withdrawForm}
            onFinish={handleWithdraw}
            layout="inline"
            style={{ marginTop: '16px' }}
          >
            <Form.Item
              name="amount"
              rules={[
                { required: true, message: 'Please enter amount' },
                { type: 'number', min: 0.00000001, message: 'Amount must be greater than 0' }
              ]}
            >
              <InputNumber
                placeholder="Amount in BTC"
                min={0.00000001}
                step={0.00000001}
                precision={8}
                style={{ width: '200px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button 
                type="default" 
                htmlType="submit" 
                icon={<MinusOutlined />}
                loading={loading}
              >
                Withdraw
              </Button>
            </Form.Item>
          </Form>
        </div>

        {error && (
          <div style={{ color: '#ff4d4f', marginTop: '16px' }}>
            Error: {error}
          </div>
        )}
      </Space>
    </Card>
  );
};

export default CollateralActions;

