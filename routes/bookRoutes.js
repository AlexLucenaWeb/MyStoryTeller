const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

// -----=====  BOOK ROUTES   =====-----

router.route('/top5').get(bookController.topBook, bookController.getAllBooks )

router
    .route('/')
    .get(authController.protect, bookController.getAllBooks)
    .post(authController.protect, authController.restrctTo('admin'), bookController.createBook);

router
    .route('/:id')
    .get(bookController.getBook)
    .patch(authController.protect, authController.restrctTo('admin'), bookController.updateBook)
    .delete(authController.protect, authController.restrctTo('admin'), bookController.deleteBook);


//  -----=====  NESTED ROUTES   =====-----

router
    .route('/:bookId/reviews')
    .post(authController.protect, authController.restrctTo('user'), reviewController.createReview);

module.exports = router;