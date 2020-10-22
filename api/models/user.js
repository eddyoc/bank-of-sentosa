const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { passError } = require('../util/errors');

const schema = {
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  picture: {
    type: String,
    required: true,
    minlength: 2
  },
  streetAddr: {
    type: String,
    required: true,
    minlength: 2
  },
  postcode: {
    type: String,
    required: true,
    minlength: 2
  },
  city: {
    type: String,
    required: true,
    minlength: 2
  },
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Date
  },
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Get basic user's fields, delete sensitive fields
userSchema.methods.getBasic = async function () {
  try {
    const userObj = this.toObject();
    delete userObj.password;
    delete userObj.updatedAt;
    return userObj;
  } catch (err) {
    passError(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
