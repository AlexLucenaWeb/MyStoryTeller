const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

//  -----=====   ROUTES   =====-----

// //  -- Creating new user: Signup  --
// router.post('/signup', authController.signup);

// //  -- Login  --
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);

// // --  Forgot and resert password  --
// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resertPassword);

// // Protecting all routes bellow:
// router.use(authController.protect);

// // --  Update my password  --
// router.patch('/updateMyPassword', authController.updatePassword);

// //  -- Get curent user  --
// router.get('/me', userController.getMe, userController.getUser);

// // --  Update user data  --
// router.patch('/updateMe', userController.updateMe);

// // --  "Delete" user account (activate: false) --
// router.delete('/deleteMe', userController.deleteMe);

// // Restriting to admin
// router.use(authController.restrctTo('admin'));

// // General routes:
// router
//     .route('')
//     .get(userController.getAllUsers)
//     .post(userController.createUser);

// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = router;