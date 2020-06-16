const Book = require('./../model/bookModel');
const APIFeatures = require('./../utils/apiFeatures');


// TOP BOOKS
exports.topBook = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,category,age,imageCover,ratingsAverage';
  next();
};

// GET ALL BOOKS AND FILTERING.
exports.getAllBooks = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// GET ONE BOOK
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// CREATE A BOOK
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// UPDATE A BOOK
exports.updateBook = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// DELETE A BOOK
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
