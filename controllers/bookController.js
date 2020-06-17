const Book = require('./../model/bookModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// TOP BOOKS
exports.topBook = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,category,age,imageCover,ratingsAverage';
  next();
};

// GET ALL BOOKS AND FILTERING.
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
      books,
    },
  });
});

// GET ONE BOOK
exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  // Handling invalid ID 404 error
  if(!book){
    return next(new AppError('No book found with this ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

// UPDATE A BOOK
exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Handling invalid ID 404 error
  if(!book){
    return next(new AppError('No book found with this ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

// DELETE A BOOK
exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  // Handling invalid ID 404 error
  if(!book){
    return next(new AppError('No book found with this ID', 404))
  }
  
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// CREATE A BOOK
exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      book: newBook,
    },
  });
});