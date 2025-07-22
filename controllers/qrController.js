const QRCode = require('../models/QRCode');

exports.registerQR = async (req, res) => {
  const { code } = req.body;
  const qr = await QRCode.findOneAndUpdate(
    { code },
    {
      scanned: true,
      scannedAt: new Date()
    },
    { new: true }
  );
  if (!qr) return res.status(404).json({ msg: 'QR not found' });
  res.json({ msg: "QR registered successfully", qr });
};

exports.redeemQR = async (req, res) => {
  const { code } = req.body;
  const qr = await QRCode.findOneAndUpdate(
    { code },
    {
      redeemed: true,
      redeemedAt: new Date()
    },
    { new: true }
  );
  if (!qr) return res.status(404).json({ msg: 'QR not found' });
  res.json({ msg: "QR redeemed successfully", qr });
};