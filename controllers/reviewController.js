const Review = require('./../model/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// -----===== REVIEW ROUTE CONTROLLERS   =====------

//  -- Get ALL reviews  --
exports.getAllReviews = catchAsync (async (req, res, next) => {
  
  let filter = {};
  if(req.params.bookId) filter = {  book: req.params.bookId  }

    const reviews = await Review.find(filter);

    // Send the query:
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews
        }
    });
});

//  -- Create a Review --
exports.createReview = catchAsync (async (req, res, next) => {
  // Nested routes:
  if (!req.body.book) req.body.book = req.params.bookId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    },
  });
});

//  -----=======  FACTORY CONTROLLERS   =====------

// --  Delete ONE review  --
exports.deleteReview = factory.deleteOne(Review);

// --  Update Review  --
exports.updateReview = factory.updateOne(Review);