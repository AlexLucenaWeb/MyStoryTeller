const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

//  -----=====   ROUTES   =====-----

//  -- Creating new user: Singup  --
router.post('/singup', authController.singup);

//  -- Login  --
router.post('/login', authController.login);

// --  Forgot and resert password  --
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resertPassword);

// --  Update my password  --
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

//  -- Get curent user  --
router.get('/me', authController.protect, userController.getMe, userController.getUser);

// --  Update user data  --
router.patch('/updateMe', authController.protect, userController.updateMe);

// --  "Delete" user account --
router.delete('/deleteMe', authController.protect, userController.deleteMe);

// General routes:
router
    .route('')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;