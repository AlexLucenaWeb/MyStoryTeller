const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

// -----=====  || FACTORY CONTROLLERS ||  =====------

//  -- Create ONE  --
exports.createOne = Model => catchAsync(async (req, res, next) => {
  const newDoc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newDoc
    },
  });
});

//  --  Get ALL  --
exports.getAll = Model => catchAsync(async (req, res, next) => {
  // Allowing nested reviews on tour:
  let filter = {};
  if(req.params.bookId) filter = {  book: req.params.bookId  }

  // EXECUTE THE QUERY:
  // Adding features from class APIFeatures:
  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const docs = await features.query;

  //SEND THE QUERY:
  res.status(200).json({
    status: 'success',
    result: docs.length,
    data: {
      data: docs
    },
  });
});

//  --  Get ONE  --
// Populate options available
exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
  
  let query = Model.findById(req.params.id);
  if(populateOptions) query = query.populate(populateOptions);

  const doc = await query;

  if(!doc){
    return next(new AppError('No document found with this ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    },
  });
});

//  --  Update ONE  --
exports.updateOne = Model => catchAsync( async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!doc){
    return next(new AppError('No document found with this ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    },
  });
});

//  --  Delete ONE  --
exports.deleteOne = Model => catchAsync( async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);
  
  if(!doc){
    return next(new AppError('No document found with this ID', 404))
  }
    
   res.status(204).json({
    status: 'success',
    data: null
  });
});
