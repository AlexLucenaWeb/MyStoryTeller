const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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
    // console.log(req.headers);

    next();
});

// 3- Routes:   
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter); 

// Route handler for not implemented routes:
// Using all for all methods and * for all routes.
app.all('*', (req, res, next) => {
    // passing and argument in next, express asumme it is an error and skip all steps and send it global error handlr
    next(new AppError(`Can´t find the route ${req.originalUrl} on this server :(`, 404));
});

app.use(globalErrorHandler);

module.exports = app;