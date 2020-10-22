const { Account } = require('@models');
const { throwError, passError } = require('../util/errors');

exports.getMyAccounts = async (req, res, next) => {
  const { user: { _id: owner } } = req;
  try {
    let accounts = await Account.find({ owner }).lean();

    if (!accounts) {
      throwError('No accounts found', 422);
    }

    res.status(200).json(accounts);
  } catch (err) {
    passError(err, next);
  }
};
