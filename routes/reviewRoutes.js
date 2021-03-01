const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

// -----=====  || REVIEW ROUTES ||  =====-----

// Protecting routes below:
// router.use(authController.protect);

// //  --  Get all Reviews and create Review  --
// router
//     .route('/')
//     .get(reviewController.getAllReviews)
//     .post( 
//         authController.restrctTo('user'), 
//         reviewController.setBookUserIds,
//         reviewController.createReview
//     );

// //  --  Delete and update review  --
// router
//     .route('/:id')
//     .patch(reviewController.updateReview)
//     .delete(reviewController.deleteReview)
//     .get(reviewController.getReview);

module.exports = router;