const Scan = require('../models/Scan');
const catchAsync = require('../utils/catchAsync');

const QRCode = require('../models/QRCode');

exports.dashboard = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Get user's QR codes
  const userQRs = await QRCode.find({ user: userId }).select('_id');
  const qrIds = userQRs.map(q => q._id);

  // 1. Basic Stats
  const activeQRs = await QRCode.countDocuments({ user: userId, status: 'active' });
  const inactiveQRs = await QRCode.countDocuments({ user: userId, status: 'inactive' });

  const totalScans = await Scan.countDocuments({ qr: { $in: qrIds } });

  // 2. Unique Users (by IP)
  const uniqueIPs = await Scan.distinct('ip', { qr: { $in: qrIds } });
  const uniqueUsers = uniqueIPs.length;

  // 3. Weekly Scans Chart Data
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const rawTrends = await Scan.aggregate([
    {
      $match: {
        qr: { $in: qrIds },
        createdAt: { $gte: sevenDaysAgo }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Format trends for frontend (fill missing days)
  const trends = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

    const found = rawTrends.find(t => t._id === dateStr);
    trends.push({
      name: dayName,
      fullDate: dateStr,
      scans: found ? found.count : 0
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      totalScans,
      activeQRs,
      uniqueUsers,
      trends
    }
  });
});
