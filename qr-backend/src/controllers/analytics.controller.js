const Scan = require('../models/Scan');

exports.dashboard = async (req, res) => {
  try {
    const totalScans = await Scan.countDocuments();
    res.json({
      status: 'success',
      message: 'Dashboard data fetched successfully',
      data: { totalScans }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
