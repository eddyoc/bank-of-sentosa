const { Transfer, Account } = require('@models');
const { throwError, passError } = require('@util/errors');
const { getShortAccount, waitFor } = require('@util/utils');

// Get all my transfers
exports.getMyTransfers = async (req, res, next) => {
  console.log('getMyTransfers');
  try {
    const { user: { _id } } = req;
    const $or = [{ sender: _id }, { recipient: _id }];
    let transfers = await Transfer.find({ $or }).lean();

    if (!transfers) {
      throwError('No transfers found', 422);
    }

    res.status(200).json(transfers);
  } catch (err) {
    passError(err, next);
  }
};

const getTransferDescription = (sourceAccount, recipientAccount) => {
  return `From account ${getShortAccount(sourceAccount)} to account ${getShortAccount(recipientAccount)}`;
};

// Create a new transfer
exports.create = async (req, res, next) => {
  const { body: transferData } = req;
  console.log(`transfers.create(${ JSON.stringify(transferData) })`);

  try {
    const { sourceAccountId, recipientAccountId } = transferData;
    const sourceAccount = await Account.findOne({ _id: sourceAccountId });
    const recipientAccount = await Account.findOne({ _id: recipientAccountId });
    if (!sourceAccount) { throwError(`Source account having id ${sourceAccountId} not found`, 422); }
    if (!recipientAccount) { throwError(`Source account having id ${recipientAccountId} not found`, 422); }
    const description = getTransferDescription(sourceAccount, recipientAccount);
    const transfer = new Transfer({ ...transferData, description });
    await transfer.save();
    if (!transfer) { throwError('Internal error sending a transfer', 422); }
    await waitFor(2000); // hack - wait for the triggers to complete
    res.status(201).json({ message: 'Transfer sent' });
  } catch (err) {
    passError(err, next);
  }
};
