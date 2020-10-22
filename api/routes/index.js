const authRouter = require('./auth');
const commonRouter = require('./common');
const usersRouter = require('./users');
const accountsRouter = require('./accounts');
const transferRouter = require('./transfers');
const transactionsRouter = require('./transactions');

module.exports = {
  authRouter,
  commonRouter,
  usersRouter,
  accountsRouter,
  transferRouter,
  transactionsRouter,
};