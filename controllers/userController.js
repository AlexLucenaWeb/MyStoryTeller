const User = require ('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');


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