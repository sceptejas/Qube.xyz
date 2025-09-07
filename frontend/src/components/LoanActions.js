import React, { useState } from 'react';
import { Card, Form, InputNumber, Button, message, Space, Divider, Select, Alert } from 'antd';
import { DollarOutlined, PayCircleOutlined } from '@ant-design/icons';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useContract } from '../hooks/useContract';
import { INTEREST_RATES, MAX_LTV_RATIO } from '../contracts';

const { Option } = Select;

const LoanActions = () => {
  const { connected, account } = useWallet();
  const { createLoan, repayLoan, loading, error } = useContract();
  const [createForm] = Form.useForm();
  const [repayForm] = Form.useForm();
  const [selectedLtv, setSelectedLtv] = useState(30);

  const handleCreateLoan = async (values) => {
    if (!connected || !account) {
      message.error('Please connect your wallet first');
      return;
    }

    try {
      const collateralAmount = Math.floor(values.collateralAmount * 100000000); // Convert to satoshis
      const txHash = await createLoan(account.address, collateralAmount, selectedLtv);
      message.success(`Loan created successfully! Transaction: ${txHash}`);
      createForm.resetFields();
    } catch (err) {
      message.error(`Loan creation failed: ${err.message}`);
    }
  };

  const handleRepayLoan = async (values) => {
    if (!connected || !account) {
      message.error('Please connect your wallet first');
      return;
    }

    try {
      const repaymentAmount = Math.floor(values.repaymentAmount * 100000000); // Convert to satoshis
      const txHash = await repayLoan(account.address, values.loanId, repaymentAmount);
      message.success(`Loan repayment successful! Transaction: ${txHash}`);
      repayForm.resetFields();
    } catch (err) {
      message.error(`Loan repayment failed: ${err.message}`);
    }
  };

  const getInterestRate = (ltv) => INTEREST_RATES[ltv] || 0;
  const calculateLoanAmount = (collateralAmount, ltv) => {
    return (collateralAmount * ltv) / 100;
  };

  if (!connected) {
    return (
      <Card title="Loan Management">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Please connect your wallet to manage loans</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Loan Management">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Create Loan Section */}
        <div>
          <h4>Create New Loan</h4>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Create a loan using your collateral. Maximum LTV ratio is {MAX_LTV_RATIO}%.
          </p>
          
          <Alert
            message="Note: This is a demo interface. In production, loan creation would require proper authorization and validation."
            type="warning"
            style={{ marginBottom: '16px' }}
          />

          <Form
            form={createForm}
            onFinish={handleCreateLoan}
            layout="vertical"
            style={{ marginTop: '16px' }}
          >
            <Form.Item
              label="Collateral Amount (BTC)"
              name="collateralAmount"
              rules={[
                { required: true, message: 'Please enter collateral amount' },
                { type: 'number', min: 0.00000001, message: 'Amount must be greater than 0' }
              ]}
            >
              <InputNumber
                placeholder="Amount in BTC"
                min={0.00000001}
                step={0.00000001}
                precision={8}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="LTV Ratio (%)"
              name="ltvRatio"
              initialValue={30}
            >
              <Select
                value={selectedLtv}
                onChange={setSelectedLtv}
                style={{ width: '100%' }}
              >
                <Option value={30}>30% (Interest: {getInterestRate(30)}%)</Option>
                <Option value={45}>45% (Interest: {getInterestRate(45)}%)</Option>
                <Option value={60}>60% (Interest: {getInterestRate(60)}%)</Option>
              </Select>
            </Form.Item>

            {createForm.getFieldValue('collateralAmount') && (
              <div style={{ 
                background: '#f0f2f5', 
                padding: '12px', 
                borderRadius: '6px',
                marginBottom: '16px'
              }}>
                <p><strong>Loan Details:</strong></p>
                <p>Collateral: {createForm.getFieldValue('collateralAmount')} BTC</p>
                <p>LTV Ratio: {selectedLtv}%</p>
                <p>Interest Rate: {getInterestRate(selectedLtv)}%</p>
                <p>Max Loan Amount: {calculateLoanAmount(createForm.getFieldValue('collateralAmount'), selectedLtv).toFixed(8)} BTC</p>
              </div>
            )}

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<DollarOutlined />}
                loading={loading}
                size="large"
                style={{ width: '100%' }}
              >
                Create Loan
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Divider />

        {/* Repay Loan Section */}
        <div>
          <h4>Repay Loan</h4>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Repay your existing loan. Enter the loan ID and repayment amount.
          </p>

          <Form
            form={repayForm}
            onFinish={handleRepayLoan}
            layout="vertical"
            style={{ marginTop: '16px' }}
          >
            <Form.Item
              label="Loan ID"
              name="loanId"
              rules={[
                { required: true, message: 'Please enter loan ID' },
                { type: 'number', min: 1, message: 'Loan ID must be a positive number' }
              ]}
            >
              <InputNumber
                placeholder="Enter loan ID"
                min={1}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Repayment Amount (BTC)"
              name="repaymentAmount"
              rules={[
                { required: true, message: 'Please enter repayment amount' },
                { type: 'number', min: 0.00000001, message: 'Amount must be greater than 0' }
              ]}
            >
              <InputNumber
                placeholder="Amount in BTC"
                min={0.00000001}
                step={0.00000001}
                precision={8}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="default" 
                htmlType="submit" 
                icon={<PayCircleOutlined />}
                loading={loading}
                size="large"
                style={{ width: '100%' }}
              >
                Repay Loan
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

export default LoanActions;

