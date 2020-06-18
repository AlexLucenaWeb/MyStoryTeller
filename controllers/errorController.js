const AppError = require ('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400); 
};


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}
const sendErrorProd = (err, res) => {

    // Operational error, send it to the client.
    if (err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });

    // Prog. or unknown error, dont send it to client.    
    } else {
        // 1- Log the error
        console.error('ERROR!', err);

        // 2- Send response
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong :('
        });
    }
}


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if(process.env.NODE_ENV === 'development '){
        sendErrorDev(err, res);

    } else if (process.env.NODE_ENV === 'production '){
        // Creating a new var to dont overwrite the err:
        let error = { ...err };

        if(err.name === 'CastError') error = handleCastErrorDB(error)

        sendErrorProd(error, res);
    } 
};