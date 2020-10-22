const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const compression = require('compression');
const cors = require('cors');
const auth = require('./auth');
const {
  authRouter,
  commonRouter,
  usersRouter,
  accountsRouter,
  transferRouter,
  transactionsRouter,
} = require('@routes');

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
// app.use(compression());
app.use(cors());

// Routes
// No auth required routes
app.use('/auth', authRouter);
app.use('/common', commonRouter);

// Verify JWT and add user data to next requests
app.use(auth);

// Auth routes
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.use('/transfers', transferRouter);
app.use('/transactions', transactionsRouter);

module.exports = { app };