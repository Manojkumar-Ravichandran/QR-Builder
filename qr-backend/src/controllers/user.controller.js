const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;

    res.status(200).json({
        status: 'success',
        data: userObj
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates.', 400));
    }

    // Filter out unwanted field names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    const userObj = updatedUser.toObject ? updatedUser.toObject() : { ...updatedUser };
    delete userObj.password;

    res.status(200).json({
        status: 'success',
        data: userObj
    });
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
