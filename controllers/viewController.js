const Book = require('../model/bookModel');
const catchAsync = require('../utils/catchAsync');

exports.allBooksPage = catchAsync(async (req, res, next) => {
    const books = await Book.find();

    res.status(200).render('allbooks', {
        title: 'All books', 
        books
    });
});

exports.bookPage = catchAsync(async (req, res, next) => {
    const book = await Book.findOne({slug: req.params.slug}).populate({
        path: 'reviews', 
        fields:'review rating user'
    });

    res.status(200).render('book', {
        title: 'book name',
        book
    });
});