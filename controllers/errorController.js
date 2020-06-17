module.exports = (err, req, res, next) => {

    err.statuscode = res.statusCode || 500;
    err.status = res.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};





// const AppError = require('./../utils/appError');

// handleCastErrorDB = err => {
//     const message = `Invalid ${err.path}: ${err.value}.`
//     return new AppError(message, 400); 
// };

// const sendErrorDev = (err, res) => {
//     res.status(err.statusCode).json({
//       status: err.status,
//       error: err,
//       message: err.message,
//       stack: err.stack
//     });
//   };

// const sendErrorProd = (err, res) => {

//     // Sending the error to the client if it is Operational
//     if(err.isOperational){
//         res.status(err.statusCode).json({ 
//             status: err.status,
//             message: err.message
//         });

//     // Not sending unknown error.
//     } else {
//         // 1- Log the error
//         console.error('ERROR 💥', err);
//         // 2- Send a generic error
//         res.status(500).json({
//             status: 'error',
//             message: 'Something went wrong :('
//         });
//     }
// };

// module.exports = (err, req, res, next) => {

//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';
    
//     if (process.env.NODE_ENV === 'development'){
//         sendErrorDev(err, res);
//     } else if (process.env.NODE_ENV === 'production'){
//         let error = { ...err };

//         if(error.name === 'CastError') error = handleCastErrorDB(error);

//         sendErrorProd(error, res);
//     }
// };
