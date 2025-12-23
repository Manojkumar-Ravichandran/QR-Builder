const QRCode = require('../models/QRCode');
const Scan = require('../models/Scan');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const UAParser = require('ua-parser-js');
const requestIp = require('request-ip');

exports.redirect = catchAsync(async (req, res, next) => {
  const qr = await QRCode.findOne({ shortCode: req.params.code });

  if (!qr || qr.status !== 'active') {
    return next(new AppError('QR Code not found or inactive', 404));
  }

  qr.scans++;
  await qr.save();

  // Parse User Agent
  const parser = new UAParser(req.headers['user-agent']);
  const result = parser.getResult();
  const clientIp = requestIp.getClientIp(req);

  await Scan.create({
    qr: qr._id,
    ip: clientIp,
    device: result.device.type || 'desktop',
    browser: result.browser.name,
    os: result.os.name,
    referrer: req.get('Referrer'),
    // City/Country would require a GeoIP lookup service (e.g. maxmind or external API).
    // For now we leave them empty or implementation for later if user provides API key.
  });

  res.redirect(qr.data);
});
