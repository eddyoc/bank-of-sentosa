const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const schema = {
  baseCurr: {
    type: String,
    required: true
  },
  quoteCurr: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true
  },
};
const xrSchema = new mongoose.Schema(schema, { timestamps: true });
const ExchangeRate = mongoose.model('ExchangeRate', xrSchema);

module.exports = { ExchangeRate };