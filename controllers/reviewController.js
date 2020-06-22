const Review = require('./../model/reviewModel');
const catchAsync = require('./../utils/catchAsync');

// -----===== REVIEW ROUTE CONTROLLERS   =====------

//  -- Get ALL reviews  --
exports.getAllReviews = catchAsync (async (req, res, next) => {
    const reviews = await Review.find();

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