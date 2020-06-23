const Review = require('./../model/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');

// -----===== || REVIEW ROUTE CONTROLLERS ||  =====------

//  --  Set User and Book Ids  --
exports.setBookUserIds = (req, res, next) => {
  // Nested routes:
  if (!req.body.book) req.body.book = req.params.bookId;
  if (!req.body.user) req.body.user = req.user.id;
  next();  
};

//  -----=======  FACTORY CONTROLLERS   =====------

//  --  Create a Review --
exports.createReview = factory.createOne(Review);

//  -- Get ALL reviews  --
exports.getAllReviews = factory.getAll(Review)

//  --  Get one Review --
exports.getReview = factory.getOne(Review);

//  --  Update Review  --
exports.updateReview = factory.updateOne(Review);

//  --  Delete ONE review  --
exports.deleteReview = factory.deleteOne(Review);