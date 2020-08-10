const Book = require('./../model/bookModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');


// -----===== || BOOK ROUTE CONTROLLERS ||  =====------

// --  Top 3 books  --
exports.topBook = async (req, res, next) => {
  req.query.limit = 3;
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,category,age,imageCover,ratingsAverage,slug,description';
  next();
};

// -----===== FACTORY CONTROLLERS   =====------

//  -- Create a book  --
exports.createBook = factory.createOne(Book);

//  --  Get ALL books  --
exports.getAllBooks = factory.getAll(Book);

//  --  Get ONE book  --
exports.getBook = factory.getOne(Book, { path: 'reviews' });

//  --  Update a book  --
exports.updateBook = factory.updateOne(Book);

//  -- Delete ONE book  --
exports.deleteBook = factory.deleteOne(Book);