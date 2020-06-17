const Book = require('./../model/bookModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

// TOP BOOKS
exports.topBook = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,category,age,imageCover,ratingsAverage';
  next();
};

// GET ALL BOOKS AND FILTERING.
exports.getAllBooks = catchAsync (async (req, res, next) => {
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
exports.getBook = catchAsync (async (req, res, next) => {
  const book = await Book.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
});

// UPDATE A BOOK
exports.updateBook = catchAsync (async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

// DELETE A BOOK
exports.deleteBook = catchAsync(async (req, res, next) => {
  await Book.findByIdAndDelete(req.params.id);
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