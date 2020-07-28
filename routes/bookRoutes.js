const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');
const userController = require('./../controllers/userController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();


//  -----=====  || BOOK ROUTES ||  =====-----

//  --  Top 5 Books  --
router.route('/top5').get(bookController.topBook, bookController.getAllBooks )

// -- Get all books and create a book  --
router
    .route('/')
    .get(bookController.getAllBooks)
    .post(authController.protect, authController.restrctTo('admin'), bookController.createBook);

router
    .route('/:id')
    .get(bookController.getBook)
    .patch(authController.protect, authController.restrctTo('admin'), bookController.updateBook)
    .delete(authController.protect, authController.restrctTo('admin'), bookController.deleteBook);

//  -----=====  SPECIAL ROUTES   =====-----

//  --  Create review  --
router.use('/:bookId/reviews', reviewRouter);

//  -- Add book to favorites --
router.patch( '/:bookId/addFavorites',
    authController.protect,
    reviewController.setBookUserIds, 
    userController.addFavorite
);

module.exports = router;