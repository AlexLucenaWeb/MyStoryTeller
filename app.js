const express = require('express');
const morgan = require('morgan');

const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1- Middleware functions
if(process.env.NODE_ENV === 'development '){
   app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3- Routes:   
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter); 

// Route handler for not implemented routes:
// Using all for all methods and * for all routes.
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can´t find the route ${req.originalUrl} on this server :(`
    // });

    const err = new Error(`Can´t find the route ${req.originalUrl} on this server :(`)
    err.status = 'fail';
    err.statusCode = 404;

    // passing and argument in next, express asumme it is an error and skip all steps and send it global error handlr
    next(err);
});

// Error handling middleware:
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    res.status(err.statusCode).json({ 
        status: err.status,
        message: err.message
    });
});

module.exports = app;