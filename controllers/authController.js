const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

exports.singup = catchAsync(async (req, res, next) => {
    const newUser = User.create(req.body);

    res.status(201).json({
        status: 'success',
        data:{
            user: newUser
        }
    });
});