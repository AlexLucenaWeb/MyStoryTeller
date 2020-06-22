const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router();

// -----=====  REVIEW ROUTES   =====-----

router
    .route('/')
    .get(authController.protect, reviewController.getAllReviews)
    .post(
        authController.protect, 
        authController.restrctTo('user'), 
        reviewController.createReview
    );

module.exports = router;