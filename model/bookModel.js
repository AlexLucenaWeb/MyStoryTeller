const mongoose = require('mongoose');

const bookSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The book must have a name'],
        unique: true
    },
    pages: {
        type: Number,
        default: 7
    },
    age: {
        type: String,
        required: [true, 'The book must have a recomended age']
    }
});
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;