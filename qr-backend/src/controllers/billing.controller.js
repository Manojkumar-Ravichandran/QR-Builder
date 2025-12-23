const razorpay = require('../config/razorpay');
const crypto = require('crypto');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const PLANS = {
  pro: 29900,
  business: 99900
};

exports.createOrder = catchAsync(async (req, res, next) => {
  if (!PLANS[req.body.plan]) {
    return next(new AppError('Invalid plan selected', 400));
  }

  const amount = PLANS[req.body.plan];
  const order = await razorpay.orders.create({
    amount,
    currency: 'INR'
  });

  res.status(200).json({
    status: 'success',
    message: 'Order created successfully',
    data: order
  });
});

exports.verify = catchAsync(async (req, res, next) => {
  const { order_id, payment_id, signature, plan } = req.body;

  const body = order_id + '|' + payment_id;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expected !== signature) {
    return next(new AppError('Invalid signature', 400));
  }

  await User.findByIdAndUpdate(req.user.id, {
    'subscription.plan': plan,
    'subscription.status': 'active'
  });

  res.status(200).json({
    status: 'success',
    message: 'Payment verified and subscription updated',
    data: null
  });
});
