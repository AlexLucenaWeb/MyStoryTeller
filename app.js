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

app.use((req, res, next) => {
    console.log('Hello from middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3- Routes:   
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter); 

module.exports = app;