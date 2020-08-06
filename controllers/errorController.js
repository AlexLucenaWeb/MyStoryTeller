const AppError = require('./../utils/appError');

// -= DIFFERENT ERROR HANDLER =-

//Cast error handler:
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Duplicate name error handler:
const handleDuplicateErrorDB = (err) => {
  const message = `Duplicate value: "${err.keyValue.name}", please choose other value`;
  return new AppError(message, 400);
};

// Vaules Validation error handler:
const handleValidationErrorDB = (error) => {
  const message = 'Invalid data sent';
  return new AppError(message, 400);
};

// JWT token error handler:
const handleJWTError = (error) =>
  new AppError('Invalid credentials, please log in', 401);

// JWT expired token error hanlder
const handleJWTExpiredError = (error) =>
  new AppError('Session expired, please log in', 401);

//-= ERROR SENDERS =-

// Development error sender:
const sendErrorDev = (err, req, res) => {
  // Api error:
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // Render errors
  console.error('ERROR!', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went worng',
    message: err.message
  });
};

// Production error sender:
const sendErrorProd = (err, req, res) => {
  // API error
  if (req.originalUrl.startsWith('/api')) {
    // Operational error, send it to the client.
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
      // Prog. or unknown error, dont send it to client.
    }
    // 1- Log the error
    console.error('ERROR!', err);

    // 2- Send response
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong :('
    });
  }

  // Render web page:
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went worng',
      message: err.message
    });
    // Prog. or unknown error, dont send it to client.
  }
  // 1- Log the error
  console.error('ERROR!', err);

  // 2- Send response
  // Render errors
  return res.status(err.statusCode).render('error', {
    title: 'Something went worng',
    message: 'Please try again later.',
  });
};

// -= GLOBAL ERROR HANDLER. PROD AND DEV =-

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development ') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production ') {
    // Creating a new var to dont overwrite the err:
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateErrorDB(error);
    if (err._message === 'Validation failed')
      error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError(error);

    sendErrorProd(error, req, res);
  }
};