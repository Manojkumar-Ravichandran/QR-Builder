const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  qr: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode' },
  ip: String,
  device: String,
  browser: String,
  os: String,
  city: String,
  country: String,
  referrer: String
}, { timestamps: true });

module.exports = mongoose.model('Scan', scanSchema);
