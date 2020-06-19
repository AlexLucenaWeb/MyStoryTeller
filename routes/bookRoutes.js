const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/top5').get(bookController.topBook, bookController.getAllBooks )

router
    .route('/')
    .get(authController.protect, bookController.getAllBooks)
    .post(bookController.createBook);

router
    .route('/:id')
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook);

module.exports = router;