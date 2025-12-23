const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;
    res.json({
      status: 'success',
      message: 'User registered successfully',
      data: userObj
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ status: 'error', message: 'Invalid credentials' });

    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(401).json({ status: 'error', message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;
    res.json({
      status: 'success',
      message: 'User logged in successfully',
      data: { token, user: userObj }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
