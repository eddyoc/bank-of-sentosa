const { passError } = require('../util/errors');

// Get myself
exports.getMyself = async (req, res, next) => {
  try {
    const user = await req.user.getBasic();
    res.status(200).json(user);
  } catch (err) {
    passError(err, next);
  }
};
