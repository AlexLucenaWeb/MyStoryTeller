const Book = require('../model/bookModel');
const Review = require('../model/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

// -----===== || VIEWS ROUTE CONTROLLERS ||  =====------

// -----=====  BOOK AND INDEX VIEW CONTROLLERS   =====------

// -- Index page  --
exports.indexPage = async (req, res) => {
    res.status(200).render('index', {
        title: '', 
    });
}

// -- Main page  --
exports.mainPage = catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Book.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const books = await features.query;
    console.log(books);

    res.status(200).render('main', {
        title: 'Home Page', 
        books
    });
});

// -- All books page  --
exports.allBooksPage = catchAsync(async (req, res, next) => {
    const books = await Book.find();

    res.status(200).render('allbooks', {
        title: 'All books', 
        books
    });
});

//  --  One book overview page  --
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

// -- Read a book  --
exports.bookRead = catchAsync(async (req, res, next) => {
    const book = await Book.findOne({slug: req.params.slug});

    if(!book){
        return next(new AppError('There is no book with that name.', 404))
    }

    res.status(200).render('readBook', {
        title: `${book.name}`,
        book
    });
});


// -----=====  USER VIEW CONTROLLERS   =====------

// --  Singup  --
exports.signupPage = catchAsync(async (req, res, next) => {    
    res.status(200).render('signup', {
    title: 'Sign-up'
    });
});

// -- Login page  --
exports.loginPage = catchAsync(async (req, res, next )=>{
    res.status(200).render('login', {
        title: 'Log-in'
    });
});

// --  Account  --
exports.getAccount = async (req, res) => {
    res.status(200).render('account', {
        title: 'Your account'
    });
};

// -- See favorites -- 
exports.getFavorites = async (req, res) => {
    books = Book.findById()

    res.status(200).render('favorites', {
        title: 'My Favorites'
    });
};

//  -- Forgoten pass  --
exports.forgotPassword = async (req, res) => {
    res.status(200).render('forgotPass',{
        title: 'Forgot my Password'
    });
};

// -----=====  REVIEW VIEW CONTROLLERS   =====------

exports.myReviews = async (req, res) => {
    const reviews = await Review.find({user: res.locals.user.id})
    console.log(reviews);

    res.status(200).render('myReviews', {
        title: 'My Reviews',
        reviews
    });
};