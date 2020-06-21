const User = require ('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// -- TOOLS --
// Filter an object looking for some fields:
const filterObj =(obj, ...allowedFileds) => {
    const newObj = {};
    Object.keys(obj).forEach(el  => {
        if (allowedFileds.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}


exports.getAllUsers = catchAsync (async (req, res, next) => {
    const users = await User.find();
  
    //SEND THE QUERY:
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users
      },
    });
});

// -- User data update --
exports.updateMe = catchAsync(async (req, res, next) => {
    // 1- Error if user try update password:
    if (req.body.password || req.body.passwordConfirmation){
        return next(
            new AppError('Plese use /updateMyPassword to update your password', 400 )
        );
    };
    
    // 2- Update user doc.
    // 2a- Just get the name and email:
    const filteredBody = filterObj(req.body, 'name', 'email');

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    // 2b- Sending the new data:
    res.status(200).json({
        status: 'success',
        data:{
            user: updatedUser
        }
    });
});


exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'err',
        message: 'Route not yet implemented'
    })
}
exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'err',
        message: 'Route not yet implemented'
    })
}
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'err',
        message: 'Route not yet implemented'
    })
}
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'err',
        message: 'Route not yet implemented'
    })
}