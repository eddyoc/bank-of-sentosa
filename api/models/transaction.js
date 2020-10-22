const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const schema = {
  date: {
    type: Date,
    required: true
  },
  accountId: {
    type: ObjectId,
    required: true,
    ref: 'Account'
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
  },
  openingBalance: {
    type: Number,
    required: true
  },
  closingBalance: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
};
const transactionSchema = new mongoose.Schema(schema, { timestamps: true });
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction };