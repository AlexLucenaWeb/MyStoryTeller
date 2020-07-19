const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// -- Render routes  --

// -- Base --
router.get('/', (req, res) => {
    res.status(200).render('base', {
    });
});

// --  All books --
router.get('/allbooks', viewController.allBooksPage);

// -- One book overview --
router.get('/book/:slug',authController.protect, viewController.bookPage);

//  --  Login  -- //
router.get('/login', viewController.loginPage);

module.exports = router;