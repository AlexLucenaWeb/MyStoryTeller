const Book = require('../model/bookModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.mainPage = catchAsync(async (req, res, next) => {
    const books = await docs

    res.status(200).render('main', {
        title: 'Home Page', 
        books
    });
});

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

    if(!book){
        return next(new AppError('There is no book with that name.', 404))
    }

    res.status(200).render('book', {
        title: `${book.name}`,
        book
    });
});

exports.loginPage = catchAsync(async (req, res, next )=>{
    res.status(200).render('login', {
        title: 'Log-in'
    });
});

exports.signupPage = catchAsync(async (req, res, next) => {    
    res.status(200).render('signup', {
    title: 'Sign-up'
    });
});

exports.getAccount = async (req, res) => {
    res.status(200).render('account', {
        title: 'Your account'
    });
};