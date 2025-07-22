const mongoose = require('mongoose');

const qrSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  scanned: { type: Boolean, default: false },
  scannedAt: { type: Date, default: null },
  redeemed: { type: Boolean, default: false },
  redeemedAt: { type: Date, default: null }
});

module.exports = mongoose.model('QRCode', qrSchema);