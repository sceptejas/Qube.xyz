import { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosClient } from '@aptos-labs/ts-sdk';
import { CONTRACT_ADDRESSES, CONTRACT_FUNCTIONS } from '../contracts';

// Initialize Aptos client
const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');

export const useContract = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user's collateral balance
  const getUserCollateral = async () => {
    if (!account) return 0;
    
    try {
      const response = await client.view({
        payload: {
          function: `${CONTRACT_ADDRESSES.COLLATERAL_VAULT}::${CONTRACT_FUNCTIONS.GET_USER_COLLATERAL}`,
          arguments: [account.address]
        }
      });
      return response[0] || 0;
    } catch (err) {
      console.error('Error getting user collateral:', err);
      return 0;
    }
  };

  // Get user's available collateral
  const getUserAvailableCollateral = async () => {
    if (!account) return 0;
    
    try {
      const response = await client.view({
        payload: {
          function: `${CONTRACT_ADDRESSES.COLLATERAL_VAULT}::${CONTRACT_FUNCTIONS.GET_USER_AVAILABLE_COLLATERAL}`,
          arguments: [account.address]
        }
      });
      return response[0] || 0;
    } catch (err) {
      console.error('Error getting available collateral:', err);
      return 0;
    }
  };

  // Get system statistics
  const getSystemStats = async () => {
    try {
      const response = await client.view({
        payload: {
          function: `${CONTRACT_ADDRESSES.LOAN_MANAGER}::${CONTRACT_FUNCTIONS.GET_SYSTEM_STATS}`,
          arguments: []
        }
      });
      return {
        totalLoans: response[0] || 0,
        activeLoans: response[1] || 0,
        totalDebt: response[2] || 0,
        totalCollateral: response[3] || 0
      };
    } catch (err) {
      console.error('Error getting system stats:', err);
      return { totalLoans: 0, activeLoans: 0, totalDebt: 0, totalCollateral: 0 };
    }
  };

  // Get interest rate for LTV ratio
  const getInterestRate = async (ltvRatio) => {
    try {
      const response = await client.view({
        payload: {
          function: `${CONTRACT_ADDRESSES.INTEREST_RATE_MODEL}::${CONTRACT_FUNCTIONS.GET_INTEREST_RATE}`,
          arguments: [ltvRatio]
        }
      });
      return response[0] || 0;
    } catch (err) {
      console.error('Error getting interest rate:', err);
      return 0;
    }
  };

  // Deposit collateral
  const depositCollateral = async (amount) => {
    if (!account || !signAndSubmitTransaction) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const transaction = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESSES.COLLATERAL_VAULT}::${CONTRACT_FUNCTIONS.DEPOSIT_COLLATERAL}`,
        arguments: [amount],
        type_arguments: []
      };

      const response = await signAndSubmitTransaction(transaction);
      await client.waitForTransaction(response.hash);
      
      return response.hash;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Withdraw collateral
  const withdrawCollateral = async (amount) => {
    if (!account || !signAndSubmitTransaction) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const transaction = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESSES.COLLATERAL_VAULT}::${CONTRACT_FUNCTIONS.WITHDRAW_COLLATERAL}`,
        arguments: [amount],
        type_arguments: []
      };

      const response = await signAndSubmitTransaction(transaction);
      await client.waitForTransaction(response.hash);
      
      return response.hash;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create loan (admin function - simplified for demo)
  const createLoan = async (borrowerAddress, collateralAmount, ltvRatio) => {
    if (!account || !signAndSubmitTransaction) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const transaction = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESSES.LOAN_MANAGER}::${CONTRACT_FUNCTIONS.CREATE_LOAN}`,
        arguments: [borrowerAddress, collateralAmount, ltvRatio],
        type_arguments: []
      };

      const response = await signAndSubmitTransaction(transaction);
      await client.waitForTransaction(response.hash);
      
      return response.hash;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Repay loan
  const repayLoan = async (borrowerAddress, loanId, repaymentAmount) => {
    if (!account || !signAndSubmitTransaction) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const transaction = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESSES.LOAN_MANAGER}::${CONTRACT_FUNCTIONS.REPAY_LOAN}`,
        arguments: [borrowerAddress, loanId, repaymentAmount],
        type_arguments: []
      };

      const response = await signAndSubmitTransaction(transaction);
      await client.waitForTransaction(response.hash);
      
      return response.hash;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getUserCollateral,
    getUserAvailableCollateral,
    getSystemStats,
    getInterestRate,
    depositCollateral,
    withdrawCollateral,
    createLoan,
    repayLoan
  };
};

