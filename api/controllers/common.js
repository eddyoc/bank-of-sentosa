const { User } = require('@models');
const { passError } = require('../util/errors');

// Get users count
exports.countUsers = async (req, res, next) => {
  console.log('countUsers');
  try {
    const usersCount = await User.countDocuments();
    res.status(200).json({ data: usersCount });
  } catch (err) {
    console.warn(err.message);
    passError(err, next);
  }
};
