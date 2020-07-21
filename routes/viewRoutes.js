const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// -- Render routes  --

// router.use(authController.isLogged);

// -- Base --
router.get('/', (req, res) => {
    res.status(200).render('base', {
    });
});

// --  All books --
router.get('/allbooks',authController.isLogged, viewController.allBooksPage);

// -- One book overview --
router.get('/book/:slug',authController.isLogged, viewController.bookPage);

//  --  Login  -- 
router.get('/login',authController.isLogged, viewController.loginPage);

//  -- User account -- 
router.get('/me',authController.protect, viewController.getAccount)

module.exports = router;