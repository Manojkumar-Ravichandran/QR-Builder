const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  subscription: {
    plan: { type: String, default: 'free' },
    status: { type: String, default: 'inactive' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
