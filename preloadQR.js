const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

// Replace with your actual MongoDB URI;

const qrSchema = new mongoose.Schema({
  code: String,
  scanned: { type: Boolean, default: false },
  scannedAt: { type: Date, default: null },
  redeemed: { type: Boolean, default: false },
  redeemedAt: { type: Date, default: null }
});

const QR = mongoose.model('QRCode', qrSchema);

const preloadQRs = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const qrList = [
    { code: 'TKK-1' },
    { code: 'TKK-2' },
    { code: 'TKK-3' },
    // Add more codes here
  ];

  for (const qr of qrList) {
    const exists = await QR.findOne({ code: qr.code });
    if (!exists) {
      await QR.create(qr);
      console.log(`Inserted: ${qr.code}`);
    } else {
      console.log(`Skipped (already exists): ${qr.code}`);
    }
  }

  mongoose.disconnect();
  console.log('Done!');
};

preloadQRs();