import { callAPI, updateAPIConfig } from './base';

// Get user's accounts
export const getMyAccounts = (params = '') => callAPI(`/accounts/my/${params}`);

// Login a user
export const loginUser = data => callAPI(`/auth/login`, 'post', data);

// Get user's transactions
export const getMyTransactions = (params = '') => callAPI(`/transactions/my/${params}`);

// Get user's transfers
export const getMyTransfers = (params = '') => callAPI(`/transfers/my/${params}`);

// Create a new transfer
export const createTransfer = data => callAPI(`/transfers`, 'post', data);

// Get active user
export const getMyself = () => callAPI(`/users/me`);

export { updateAPIConfig };