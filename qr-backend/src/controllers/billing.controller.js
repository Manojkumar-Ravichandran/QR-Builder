const razorpay = require('../config/razorpay');
const crypto = require('crypto');
const User = require('../models/User');

const PLANS = {
  pro: 29900,
  business: 99900
};

exports.createOrder = async (req, res) => {
  try {
    const amount = PLANS[req.body.plan];
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR'
    });
    res.json({
      status: 'success',
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.verify = async (req, res) => {
  try {
    const body = req.body.order_id + '|' + req.body.payment_id;
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== req.body.signature)
      return res.status(400).json({ status: 'error', message: 'Invalid signature' });

    await User.findByIdAndUpdate(req.user.id, {
      'subscription.plan': req.body.plan,
      'subscription.status': 'active'
    });

    res.json({
      status: 'success',
      message: 'Payment verified and subscription updated',
      data: null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
