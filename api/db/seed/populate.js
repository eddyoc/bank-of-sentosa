const { dropDB } = require('../mongoose');
const { dummyData, getDefaultTransferData } = require('./dummyData');
const { Account, User, Transfer, ExchangeRate } = require('@models');
const { getShortAccount, flatten } = require('@util/utils');

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const createAccount = (accountData, { _id: owner }) => {
  const account = new Account({
    ...accountData,
    owner,
  });

  return account.save();
};

const createExchangeRate = (xrData) => {
  const xr = new ExchangeRate(xrData);
  return xr.save();
};

const getUserName = ({ firstName, lastName }) => `${firstName} ${lastName}`;

const createTransfer = data => {
  const transferData = {
    ...getDefaultTransferData(),
    ...data,
  };
  const transfer = new Transfer(transferData);

  return transfer.save();
};

const createUsers = async () => {
  return await Promise.all(dummyData.users.map(data => createUser(data)));
};

const createAccounts = async (users) => {
  return flatten(await Promise.all(users.map(user => {
    return Promise.all(dummyData.accounts.map(data => createAccount(data, user)));
  })));
};

const getRecipientAccountId = (accounts, owner, sourceAccountId) => {
  const candidateAccounts = accounts
    .filter(x => x.owner === owner)
    .filter(x => x._id !== sourceAccountId);
  // Select an account at random from the candidates;
  const recipientAccount = candidateAccounts[Math.floor(Math.random() * candidateAccounts.length)];

  return recipientAccount._id;
};

const createExchangeRates = async () => {
  return Promise.all(dummyData.exchangeRates.map(data => createExchangeRate(data)));
};

const getTransferDescription = (accounts, sourceAccountId, recipientAccountId) => {
  const sourceAccount = accounts.find(x => x._id === sourceAccountId);
  const recipientAccount = accounts.find(x => x._id === recipientAccountId);
  return `From account ${getShortAccount(sourceAccount)} to account ${getShortAccount(recipientAccount)}`;
};

const createTransfers = async (accounts, users) => {
  return flatten(await Promise.all(accounts.map(account => {
    const { _id: sourceAccountId, owner } = account;
    const recipientAccountId = getRecipientAccountId(accounts, owner, sourceAccountId);
    const description = getTransferDescription(accounts, sourceAccountId, recipientAccountId);
    const currency = account.currency;
    const sender = owner;
    const recipient = owner;
    return createTransfer({
      sourceAccountId,
      recipientAccountId,
      description,
      sender,
      recipient,
      currency,
    });
  })));
};

const initDatabase = async () => {
  await dropDB();
  const exchangeRates = await createExchangeRates();
  const users = await createUsers();
  const accounts = await createAccounts(users);
  const transfers = await createTransfers(accounts, users);
};

module.exports = {
  initDatabase,
  createExchangeRates,
  createUsers,
  createAccounts,
  createTransfers,
};
