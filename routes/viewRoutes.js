const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

const router = express.Router();

// -- Render routes  --

// -- index page  --
router.get('/', viewController.indexPage);

// // -- Main --
router.get('/main', authController.isLogged, bookController.topBook, viewController.mainPage);

// --  All books --
router.get('/allbooks',authController.isLogged, viewController.allBooksPage);


// -- One book overview --
router.get('/books/:slug',authController.isLogged, viewController.bookPage);

// -- signup --
router.get('/signup', viewController.signupPage);

//  --  Login  -- 
router.get('/login',authController.isLogged, viewController.loginPage);

//  -- User account -- 
router.get('/me',authController.protect, viewController.getAccount);

// -- User favorites  --
router.get('/myFavorites',authController.protect, viewController.getFavorites);

//  -- Read a book  --
router.get('/books/:slug/read', authController.isLogged, viewController.bookRead);

// -- My Review --
router.get('/myReviews', authController.isLogged, viewController.myReviews);


module.exports = router;