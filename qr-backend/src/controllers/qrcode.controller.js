const QRCode = require('../models/QRCode');
const genCode = require('../utils/generateShortCode');

exports.create = async (req, res) => {
  try {
    const qr = await QRCode.create({
      ...req.body,
      user: req.user.id,
      shortCode: genCode()
    });
    res.json({
      status: 'success',
      message: 'QR code created successfully',
      data: qr
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const qr = await QRCode.findOne({
      _id: req.params.id,
      user: req.user.id, // 🔐 ensure ownership
    });

    if (!qr) {
      return res.status(404).json({
        status: 'error',
        message: 'QR code not found',
      });
    }

    res.json({
      status: 'success',
      message: 'QR code fetched successfully',
      data: qr,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const qrs = await QRCode.find({ user: req.user.id });
    res.json({
      status: 'success',
      message: 'QR codes fetched successfully',
      data: qrs
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const qr = await QRCode.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id, // 🔐 ownership check
      },
      req.body,
      { new: true }
    );

    if (!qr) {
      return res.status(404).json({
        status: 'error',
        message: 'QR code not found',
      });
    }

    res.json({
      status: 'success',
      message: 'QR code updated successfully',
      data: qr,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};


exports.remove = async (req, res) => {
  try {
    const qr = await QRCode.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // 🔐 ownership check
    });

    if (!qr) {
      return res.status(404).json({
        status: 'error',
        message: 'QR code not found',
      });
    }

    res.json({
      status: 'success',
      message: 'QR code deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

