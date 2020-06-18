const mongoose = require('mongoose');
const dotenv = require('dotenv');
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

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}....`)
});

// Handling Unhandled Promise Rejections:
process.on('unhandledRejection', err => {
    // Login error.
    console.log(err.name, err.message);
    console.log('UNHANDLER REJECTION!, shutting down..');

    // Closing the server and shutting down:
    server.close(()=>{
        process.exit(1);
    }); 
});