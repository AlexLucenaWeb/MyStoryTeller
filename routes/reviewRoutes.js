const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

// -----=====  REVIEW ROUTES   =====-----

router
    .route('/')
    .get(authController.protect, reviewController.getAllReviews)
    .post(
        authController.protect, 
        authController.restrctTo('user'), 
        reviewController.createReview
    );

router.route('/:id').delete(reviewController.deleteReview);

module.exports = router;