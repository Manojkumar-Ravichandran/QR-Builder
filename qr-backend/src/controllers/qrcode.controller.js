const QRCode = require('../models/QRCode');
const genCode = require('../utils/generateShortCode');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.create = catchAsync(async (req, res, next) => {
  const qr = await QRCode.create({
    ...req.body,
    user: req.user.id,
    shortCode: genCode()
  });

  res.status(201).json({
    status: 'success',
    message: 'QR code created successfully',
    data: qr
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const qr = await QRCode.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!qr) {
    return next(new AppError('QR code not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'QR code fetched successfully',
    data: qr,
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const qrs = await QRCode.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    message: 'QR codes fetched successfully',
    results: qrs.length,
    data: qrs
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const qr = await QRCode.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!qr) {
    return next(new AppError('QR code not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'QR code updated successfully',
    data: qr,
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const qr = await QRCode.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!qr) {
    return next(new AppError('QR code not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'QR code deleted successfully',
    data: null,
  });
});
