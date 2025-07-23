const express = require('express');
const router = express.Router();
const QRCode = require('../models/QRCode');
const authMiddleware = require('../middleware/authMiddleware');
const { registerQR, redeemQR } = require('../controllers/qrController');

router.post('/registerQR', registerQR);
router.post('/redeemQR', redeemQR);

router.get('/stats', async (req, res) => {
  try {
    const total = await QRCode.countDocuments();
    const scanned = await QRCode.countDocuments({ scanned: true });
    const redeemed = await QRCode.countDocuments({ redeemed: true });
    const qrList = await QRCode.find({}, 'code scanned redeemed');

    res.json({
      total,
      scanned,
      redeemed,
      qrList
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching stats', error });
  }
});

module.exports = router;