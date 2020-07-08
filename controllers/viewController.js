const Book = require('../model/bookModel');
const catchAsync = require('../utils/catchAsync');

exports.allBooksPage = catchAsync(async (req, res, next) => {
    const books = await Book.find();



    res.status(200).render('allbooks', {
        title: 'All books', 
        books
    });
});

exports.bookPage = (req, res) => {
    res.status(200).render('book', {
        title: 'book name'
    });
}