const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// Generating Tokens using json web token:
const singToken = id =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// -= AUTHENTICATE USERS =-

// Singup:
exports.singup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
        passwordConfirmation: req.body.passwordConfirmation,
    });

    // TOKEN, using function created
    const token = singToken(newUser._id);

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
    
    // 3- All ok, send token
    const token = singToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    });
});

// -= PROTECTING ROUTES =-

exports.protect = catchAsync ( async(req, res, next) => {
    // 1- Getting and checking the token:
    let token;

    // 1a- Geting the token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    // 1b- Checkig if the token exists
    if (!token){
        return next(new AppError('Please log in', 401));
    };

    // 2- Verificating the token:
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.log(error);

    // 3- Checking the User:


    // 4- Checking password was changed after creating token:


    next();
});