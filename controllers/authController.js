const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


// Singup:
exports.singup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
        passwordConfirmation: req.body.passwordConfirmation,
    });

    // TOKEN, using json web token:
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });    

    res.status(201).json({
        status: 'success',
        token,
        data:{
            user: newUser
        }
    });
});

// Login:

exports.login = catchAsync (async (req, res, next) => {
    // Getting email and password_
    // const email = req.body.email; because the name and the required is the same:
    const { email, password } = req.body;

    // 1- check if email and password exists
    if (!email || !password){
        // Sending error:
       return next(new AppError('Please introduce an email and password', 400));
    };

    // 2- check if user exists and pass is correct
    // Using select with the + in the field to get the password which is unslectable.
    const user = await User.findOne({ email }).select('+password');
    //const correct = await user.correctPass(password, user.password); *Pasing this const directly in the if

    if(!user || !(await user.correctPass(password, user.password))){
        return next(new AppError('Incorrect user or password', 401));
    }
    
    // console.log(user);
    // 3- All ok, send token

    const token = '';
    res.status(200).json({
        status: 'success',
        token
    });
});