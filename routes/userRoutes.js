const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// -= ROUTES =-

// Creating new user: Singup.
router.post('/singup', authController.singup);
router.post('/login', authController.login);


// Forgot and resert password.
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/forgotPasswordresetPassword/:token', authController.resertPassword);

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