const mongoose = require('mongoose');
const MongooseTrigger = require('mongoose-trigger');
const { onTransferCreate } = require('@triggers');

const { ObjectId } =  mongoose.Schema.Types;

const schema = {
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  sourceAccountId: {
    type: ObjectId,
    required: true,
    ref: 'Account'
  },
  recipientAccountId: {
    type: ObjectId,
    required: true,
    ref: 'Account'
  },
  sender: {
    type: ObjectId,
    required: false,
    ref: 'User'
  },
  currency: {
    type: String,
    required: true,
  },
  recipient: {
    type: ObjectId,
    required: false,
    ref: 'User'
  },
  description: {
    type: String,
    required: true,
  }
};
const transferSchema = new mongoose.Schema(schema, { timestamps: true });

const transferEvents = MongooseTrigger(transferSchema, {
  events: {
    create: true,
    update: false,
    remove: false,
  },
  debug: true,
});

transferEvents.on('create', data => onTransferCreate(data));

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = { Transfer };
