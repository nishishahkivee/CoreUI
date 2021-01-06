
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');
const role = require('../lib/role');
const { roles, USER } = require('../constants/roles');
const { User } = require('../lib/role');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const UserSchema = new Schema({
  // id: { type: String, default: uuid, unique: true },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    trim: true,
    default: User,
    enum: roles,
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: { type: Date, default: Date.now },
  lastFailedLogin: Date,
  currentLogin: { type: Date, default: Date.now },
}, options);

module.exports = mongoose.model('User', UserSchema);
