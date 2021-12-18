const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  cart: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
