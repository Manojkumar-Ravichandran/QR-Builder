const mongoose = require('mongoose');

const qrSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  type: String,
  data: String,
  shortCode: { type: String, unique: true },
  isDynamic: Boolean,
  status: { type: String, default: 'active' },
  design: Object,
  scans: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('QRCode', qrSchema);
