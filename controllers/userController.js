const User = require ('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');


// ----=====  || USER ROUTES CONTROLERS ||  =====-----

// ----=====   TOOLS   =====-----

// --  Filter an object looking for some fields  --
const filterObj =(obj, ...allowedFileds) => {
    const newObj = {};
    Object.keys(obj).forEach(el  => {
        if (allowedFileds.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

// -----===== USER "ME" FEATURES =====-----

// -- ME endpoint  --
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

// --  Update user data  --
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

//  --  "Delete" user data  --
exports.deleteMe = catchAsync( async(req, res, next) =>{
    await User.findByIdAndUpdate(req.user.id, { active: false});

    res.status(204).json({
        status: 'success',
        data: null
    });
});

//  --  Create User --
exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'err',
        message: 'Please use Sing Up'
    })
}

//  -----=======  FACTORY CONTROLLERS   =====------

// --  Get one user  --
exports.getUser = factory.getOne(User);

// --  Get ALL users  --
exports.getAllUsers = factory.getAll(User);

// --  Delete ONE User  --
exports.deleteUser = factory.deleteOne(User);

// --  Update ONE User  --
exports.updateUser = factory.updateOne(User);

