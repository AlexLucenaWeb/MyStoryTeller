const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

const router = express.Router();

// -- Render routes  --

// router.use(authController.isLogged);

// -- Base --
router.get('/', (req, res) => {
    res.status(200).render('base', {
    });
});

// // -- Main --
// router.get('/main', authController.isLogged, bookController.topBook, viewController.mainPage);

// --  All books --
router.get('/allbooks',authController.isLogged, viewController.allBooksPage);

// -- One book overview --
router.get('/book/:slug',authController.isLogged, viewController.bookPage);

// -- signup --
router.get('/signup', viewController.signupPage);

//  --  Login  -- 
router.get('/login',authController.isLogged, viewController.loginPage);

//  -- User account -- 
router.get('/me',authController.protect, viewController.getAccount);




module.exports = router;