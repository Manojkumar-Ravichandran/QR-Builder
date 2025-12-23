const QRCode = require('../models/QRCode');
const Scan = require('../models/Scan');

exports.redirect = async (req, res) => {
  const qr = await QRCode.findOne({ shortCode: req.params.code });
  if (!qr || qr.status !== 'active') return res.sendStatus(404);

  qr.scans++;
  await qr.save();

  await Scan.create({
    qr: qr._id,
    device: req.headers['user-agent']
  });

  res.redirect(qr.data);
};
