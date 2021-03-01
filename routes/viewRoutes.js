const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

const router = express.Router();

// -- Render routes  --

// -- index page  --
router.get('/', authController.isLogged, viewController.indexPage);

// -- signup --
// router.get('/signup', viewController.signupPage);

// //  --  Login  -- 
// router.get('/login',authController.isLogged, viewController.loginPage);

// //  -- Forgot Password  --
// router.get('/forgotPassword', viewController.forgotPassword);

// //  -- User account -- 
// router.get('/me',authController.protect, viewController.getAccount);

// // -- User favorites  --
// router.get('/myFavorites',authController.protect, viewController.getFavorites);

// // -- My Review --
// router.get('/myReviews', authController.isLogged, viewController.myReviews);

// // -- Main --
// router.get('/main', authController.isLogged, bookController.topBook, viewController.mainPage);

// // --  All books --
// router.get('/allbooks',authController.isLogged, viewController.allBooksPage);

// // -- One book overview --
// router.get('/books/:slug',authController.isLogged, viewController.bookPage);

// //  -- Search book  --
// // router.get('/search', authController.isLogged, viewController.search);

// //  -- Read a book  --
// router.get('/books/:slug/read', authController.isLogged, viewController.bookRead);

// // -- About us  --
// router.get('/about', authController.isLogged, viewController.about);

module.exports = router;