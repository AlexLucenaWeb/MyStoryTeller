const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

// -- Generating Tokens using json web token --
const singToken = id =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// -----=====   AUTHENTICATE USERS  =====-----

//-- Singup --
exports.singup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
        passwordConfirmation: req.body.passwordConfirmation,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role
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


// -- Login --
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

// -----=====   PROTECTING ROUTES   =====-----

// -- User protec --
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

    // 3- Checking the User:
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(
            new AppError('The User does not longer exist.', 401)
        );
    };

    // 4- Checking password was changed after creating token:
    if (currentUser.changedPassAfter(decoded.iat)){
        return next(
            new AppError('The password was recently changed, please log in again.', 401)
        );
    };

    // Access to protected route:
    req.user = currentUser;
    next();
});

// -- Admin Restriction --
exports.restrctTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new AppError('You do not have permission to perform this action.', 403)
            );
        }
        next();
    };
};


// -----=====   RESERT PASSWORD   =====-----

// -- Forgot password --
exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1 get user:
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with that email.', 404));
    };

    // 2 generate random reset token:
    const resetToken = user.createPasswordResetToken();
    // Saving the new data but not all requiered fields.
    await user.save({ validateBeforeSave: false });

    // 3 Send it to user email.
    const resetURL = `${req.protocol}://${req.get('host')}/ap1/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a Patch request with your new password and passwordConfirm to ${resetURL}.
                    \nIf you did not forget your password, please ignore this email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset request (valid for 10 mins)',
            message
        });
            
        res.status(200).json({
            status: 'success',
            message: 'Token sendt to email!'
        });
    } catch (err){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError ('There were and error sending the email, try again.', error), 500);
    } 
});

    


// -- Reset password --
exports.resertPassword = (req, res, next) => {}