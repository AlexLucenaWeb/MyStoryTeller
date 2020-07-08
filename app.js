const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// -----===== GLOBAL MIDDLEWARE FUNCTIONS  =====-----

// --  Serving statics files  --
app.use(express.static(path.join(__dirname, 'public')));

// --  Protecting headers with helmet  --
app.use(helmet());

// --  Using morgan in development  ---
if(process.env.NODE_ENV === 'development '){
   app.use(morgan('dev'));
}

// --  Limiting requests  ---
const limiter = rateLimit({
    max: 300,
    windowMs: 60 * 60 * 1000,
    message: 'To many requests from this IP, please try again in an hour.'
});
app.use('/api', limiter);

// --  Body parser  --
app.use(express.json( { limit: '10kb' } ));

// --  Data Sanitization  --
// Against NoSQL query injections:
app.use(mongoSanitize());

// Against XSS
app.use(xss());

// --  Prevent parameter pollution  --
app.use(hpp({
    whitelist: [  'age', 'ratingsAverage', 'category'
    ]
}));

// --  Test middleware  --
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
});


// -----===== || ROUTES ||  =====-----  

// -- render routes  --
app.use('/', viewRouter);

// -- Controller routes  --
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter); 
app.use('/api/v1/reviews', reviewRouter); 

//  --  Route handler for not implemented routes  --
// Using all for all methods and * for all routes.
app.all('*', (req, res, next) => {
    // passing and argument in next, express asumme it is an error and skip all steps and send it global error handlr
    next(new AppError(`Can´t find the route ${req.originalUrl} on this server :(`, 404));
});

app.use(globalErrorHandler);

module.exports = app;