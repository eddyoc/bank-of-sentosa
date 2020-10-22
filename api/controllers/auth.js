const CONFIG = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('@models');
const { throwError, passError, handleValidationErrors } = require('../util/errors');


const getSecureToken = user => {
   const { _id, email } = user;
   const options = { expiresIn: CONFIG.jwt_expiration };
   return jwt.sign({ id: _id, email }, CONFIG.jwt_secret_key, options);
};

// Login user (from auth/routes)
exports.login = async (req, res, next) => {
   console.log(`[controllers] auth.login`);
   try {
      const { email, password } = req.body;
      let user = await User.findOne({ email }).lean();
      if (!user) {
         throwError('A user with this email could not be found', 422);
      }

      let isPassOk = await bcrypt.compare(password, user.password);
      if (!isPassOk) {
         throwError('Wrong password!', 401);
      }

      const token = getSecureToken(user);

      res.status(200).json(token);
   } catch (err) {
      passError(err, next, res);
   }
};


// // Set new user's password
// // Step 2
// exports.resetPassword = async (req, res, next) => {
//    // try {
//    //    const { email, password, token } = req.body;
//    //    let user = await User.findOne({
//    //       email,
//    //       resetToken: token,
//    //       resetTokenExpiration: { $gte: Date.now() }
//    //    });
//    //
//    //    if (!user) {
//    //       throwError('No user found or token has expired', 401);
//    //    }
//    //
//    //    user.password = password;
//    //    user.resetToken = undefined;
//    //    user.resetTokenExpiration = undefined;
//    //
//    //    await user.save();
//    //
//    //    // Send pass reset notification
//    //    sendEmail('password-reset', {
//    //       to: user.email,
//    //       firstName: user.firstName
//    //    });
//    //
//    //    res.status(200).json({ status: 'New password has been set' });
//    // } catch (err) {
//    //    passError(err, next);
//    // }
// };
