const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Uncaught exceptions handler:
process.on('uncaughtException', err => {
    // Login error.
    console.log('UNCAUGHT EXCEPTION! Shuting down...');
    console.log(err.name, err.message);
    // Shutting down:
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

//Database:
const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('DB connections successful'));

// Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}....`)
});

//Unhandled Promise Rejections handler:
process.on('unhandledRejection', err => {
    // Login error.
    console.log('UNHANDLER REJECTION! Shutting down..');
    console.log(err.name, err.message);

    // Closing the server and shutting down:
    server.close(()=>{
        process.exit(1);
    }); 
});

process.on('SIGTERM', ()=>{
    console.log('SIGTERM recived, shutting down.');
    server.close(()=>{
        console.log(' Process terminated.');
    });
});