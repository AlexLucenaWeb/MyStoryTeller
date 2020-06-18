const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please writte a name'],
        unique: true,
        trim: true,
        maxlength: [15, 'A user name must have less or equal then 40 characters'],
        minlength: [2, 'A user name must have more or equal then 10 characters']
    },
    email: {
        type: String,
        required: [true, 'Please writte a name'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        maxlength: [20, 'A user password must have less or equal then 20 characters'],
        minlength: [8, 'A user password must have more or equal then 8 characters']
    },
    passwordConfirmation: {
        type: String,
        required: [true, 'Please confirm your password'],
        maxlength: [20, 'A user password must have less or equal then 20 characters'],
        minlength: [8, 'A user password must have more or equal then 8 characters']
    }
});

const User = mongoose.model('User', userSchema);


module.exports = User;