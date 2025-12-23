const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  qr: { type: mongoose.Schema.Types.ObjectId, ref: 'QRCode' },
  device: String,
  country: String
}, { timestamps: true });

module.exports = mongoose.model('Scan', scanSchema);
