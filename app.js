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
    res.status(404).json({
        status: 'fail',
        message: `Can´t find the route ${req.originalUrl} on this server :(`
    });
});

module.exports = app;