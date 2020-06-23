const Book = require('./../model/bookModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// -----===== BOOK ROUTE CONTROLLERS   =====------

// --  Top 5 bokks  --
exports.topBook = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,category,age,imageCover,ratingsAverage';
  next();
};

// --  Get ALL books and FILTERING  --
exports.getAllBooks = catchAsync(async (req, res, next) => {

  // EXECUTE THE QUERY:
  // Adding features from class APIFeatures:
  const features = new APIFeatures(Book.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const books = await features.query;

  //SEND THE QUERY:
  res.status(200).json({
    status: 'success',
    result: books.length,
    data: {
      books
    },
  });
});

// --  Get ONE book  --
exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id).populate('reviews');

  // Handling invalid ID 404 error
  if(!book){
    return next(new AppError('No book found with this ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      book
    },
  });
});

// -- Create a book  --
exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      book: newBook
    },
  });
});

// -----===== FACTORY CONTROLLERS   =====------

// -- Delete ONE book  --
exports.deleteBook = factory.deleteOne(Book);

// --  Update a book  --
exports.updateBook = factory.updateOne(Book);

// exports.updateBook = catchAsync(async (req, res, next) => {
//   const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   });

//   // Handling invalid ID 404 error
//   if(!book){
//     return next(new AppError('No book found with this ID', 404))
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       book
//     },
//   });
// });