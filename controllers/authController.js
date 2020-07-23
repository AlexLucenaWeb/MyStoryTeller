const crypto = require('crypto');
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

// -- Creating and sending Tokens --
const createSendToken = (user, statusCode, res) => {
    const token = singToken(user._id);

    // Seting cookie options
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES *24 *60 *60* 1000),
        httpOnly: true
    };
    // Seting the secure option only in production:
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // Sending the cookie:
    res.cookie('jwt', token, cookieOptions );

    // Remove password from output.
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data:{
            user
        }
    });
};

// -----=====   AUTHENTICATE USERS  =====-----

//-- Signup --
exports.signup = catchAsync(async (req, res, next) => {
    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password, 
    //     passwordConfirmation: req.body.passwordConfirmation,
    //     passwordChangedAt: req.body.passwordChangedAt,
    //     role: req.body.role
    // });
    const newUser = await User.create(req.body);

    createSendToken(newUser, 201, res);
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
        return next(new AppError('Incorrect email or password', 401));
    }
    
    // 3- All ok, send token
    createSendToken(user, 200, res);
});

// -- Logout  --
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10* 1000 ),
        httpOnly: true
    });
    res.status(200).json({ status: 'success'  });
}


// -----=====   PROTECTING ROUTES   =====-----

// -- User protec --
exports.protect = catchAsync ( async(req, res, next) => {
    // 1- Getting and checking the token:
    let token;

    // 1a- Geting the token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt){
        token = req.cookies.jwt;
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
    res.locals.user = currentUser;
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

// --  Checking is user is loged, only for render  --
exports.isLogged = async(req, res, next) => {
    if (req.cookies.jwt){
        try{ 
            // 1- Verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt, 
                process.env.JWT_SECRET
            );

            // 2- Checking the User:
            const currentUser = await User.findById(decoded.id);
            if(!currentUser){
                return next();
            };

            // 3 Checking password was changed after creating token:
            if (currentUser.changedPassAfter(decoded.iat)){
                return next();
            };

            // There is a logged user:
            res.locals.user = currentUser;
        } catch (err) {
            return next();
        }
    }
    next();
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
exports.resertPassword = catchAsync (async (req, res, next) => {
    // 1- Get user bsaed in the token:
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    // also checking if the token has expired:
    const user = await User.findOne({
        passwordResetToken: hashedToken, 
        passwordResetExpires: {$gt: Date.now()}
    });

    // 2- Not expired Token && user, set new password:
    if(!user){
        return next(new AppError('Ivalid token or it is expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirmation = req.body.passwordConfirmation;
        // Delete token:
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save(); 

    // 3- Log the User in, send JWT:
    createSendToken(user, 200, res);
});

// -- Update Password --

exports.updatePassword = catchAsync (async (req, res, next) => {
    // 1- Get the User:
    const user = await User.findById(req.user.id).select('+password');

    // 2- Check posted password:
    if(!(await user.correctPass(req.body.passwordCurrent, user.password))){
        return next(new AppError('Your current password is incorrect.', 401));
    };

    // 3- Update the password:
    user.password = req.body.password;
    user.passwordConfirmation = req.body.passwordConfirmation;
    await user.save();

    // 4- Log user in, send JWT:
    createSendToken(user, 200, res);
});