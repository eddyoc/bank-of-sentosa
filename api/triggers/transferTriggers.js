
const generateTransaction = async transactionData => {
  const { Account, Transaction } = require('../models');

  const { accountId: _id, amount } = transactionData;
  const transaction = new Transaction(transactionData);
  const updateDocument = { $inc: { 'balance': amount } };

  try {
    const options = { returnOriginal: false };
    await Account.findOneAndUpdate({ _id }, updateDocument, options).lean();
    await transaction.save();
  } catch (err) {
    console.warn(`Exception thrown generateTransaction ${err.message}`);
  }
};

const convertAmountForExchangeRate = async (baseCurr, quoteCurr, baseAmount) => {
  const { ExchangeRate } = require('@models');
  if (baseCurr === quoteCurr) return baseAmount;

  const query = { baseCurr, quoteCurr };
  const exchangeRate = await ExchangeRate.findOne(query);
  const { rate } = exchangeRate;
  return baseAmount * rate;
};

const getValuesFromAccount = async ({ amount: baseAmount, currency: baseCurr }, accountId) => {
  const { Account } = require('@models');
  const account = await Account.findOne({ _id: accountId }).lean();
  const { currency, sortcode, number, balance } = account;
  const amount = await convertAmountForExchangeRate(baseCurr, currency, baseAmount);

  return {
    amount,
    balance,
    currency,
    description: `${sortcode} / ${number}`
  }
};

const createSourceAccountTransaction = async (transfer) => {
  const { date, sourceAccountId: accountId, reference, sender: owner } = transfer;
  let { amount, description, balance, currency } = await getValuesFromAccount(transfer, accountId);
  amount = -amount;
  const sourceAccountTxData = {
    date,
    amount,
    currency,
    owner,
    accountId,
    openingBalance: balance,
    closingBalance: balance + amount,
    type: 'Outgoing Transfer',
    reference,
    description: `To account ${description}`,
  };
  await generateTransaction(sourceAccountTxData);
};

const createDestinationAccountTransaction = async (transfer) => {
  const { date, recipientAccountId: accountId, reference, recipient: owner } = transfer;
  let { amount, description, balance, currency } = await getValuesFromAccount(transfer, accountId);
  const destinationAccountTxData = {
    date,
    amount,
    currency,
    owner,
    accountId,
    openingBalance: balance,
    closingBalance: balance + amount,
    type: 'Incoming Transfer',
    reference,
    description: `From account ${description}`,
  };
  await generateTransaction(destinationAccountTxData);
};

const onTransferCreate = async transfer => {
  await createSourceAccountTransaction(transfer); // source account
  await createDestinationAccountTransaction(transfer); // destination account
};

module.exports = {
  onTransferCreate,
};