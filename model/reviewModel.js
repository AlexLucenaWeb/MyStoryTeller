const mongoose = require('mongoose');

//  -----=====   REVIEW MODEL   =====-----
const reviewSchema = new mongoose.Schema ({
    review: {
        type: String,
        required: [true, 'Review can not be empty.']
    },
    rating: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'] 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    book:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Book',
            required: [true, 'Review must belong to a book.']
        }
    ],
    user:[
        {
            type: mongoose.Schema.ObjectId,
            user: 'User',
            required: [true, 'Review msut belong to a user.']
        }
    ]
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});



// -----====   CREATE AND EXPORT THE REVIEW   =====-----
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;