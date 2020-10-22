const { Transaction } = require('@models');
const { throwError, passError } = require('@util/errors');

exports.getMyTransactions = async (req, res, next) => {
  console.log('getMyTransactions');
  try {
    const { user: { _id } } = req;
    let transactions = await Transaction.find({ owner: _id }).lean();

    if (!transactions) {
      throwError('No transactions found', 422);
    }

    res.status(200).json(transactions);
  } catch (err) {
    passError(err, next);
  }
};
