const CONFIG = require('../config');
let jwt = require('jsonwebtoken');

const { User } = require('@models');

// Utilities
const { throwError, passError, handleValidationErrors } = require('../util/errors');

const getUserFromToken = async (token) => {
   token = token.replace('Bearer ', '');
   const { id: _id } = jwt.verify(token, CONFIG.jwt_secret_key);
   console.log(`User id = ${_id}`);
   return await User.findOne({ _id });
};

// Verify JWT and add user to next requests
const auth = async (req, res, next) => {
   try {
      let token = req.header('Authorization');
      console.log(`auth token = ${token}`);
      if (!token) {
         throwError('Auth token not available or incorrect', 422);
      }

      const user = await getUserFromToken(token);
      if (!user) {
         throwError('No user found or token is incorrect', 422);
      }

      req.token = token;
      req.user = user;
      next();
   } catch (err) {
      passError(err, next);
   }
};

module.exports = auth;
