const QRCode = require('../models/QRCode');

exports.registerQR = async (req, res) => {
  const { code } = req.body;

  const qr = await QRCode.findOne({ code });
  if (!qr) return res.status(404).json({ msg: 'QR not found' });

  if (qr.scanned) {
    return res.status(400).json({ msg: 'QR already registered' });
  }

  qr.scanned = true;
  qr.scannedAt = new Date();
  await qr.save();

  res.json({ msg: 'QR registered successfully', qr });
};

exports.redeemQR = async (req, res) => {
  const { code } = req.body;

  const qr = await QRCode.findOne({ code });
  if (!qr) return res.status(404).json({ msg: 'QR not found' });

  if (!qr.scanned) {
    return res.status(400).json({ msg: 'QR must be registered before redeeming' });
  }

  if (qr.redeemed) {
    return res.status(400).json({ msg: 'QR already redeemed' });
  }

  qr.redeemed = true;
  qr.redeemedAt = new Date();
  await qr.save();

  res.json({ msg: 'QR redeemed successfully', qr });
};