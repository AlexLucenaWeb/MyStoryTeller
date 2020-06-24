const mongoose = require('mongoose');
const Book = require('./bookModel');

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
            ref: 'User',
            required: [true, 'Review msut belong to a user.']
        }
    ]
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// -----====   REVIEW MIDDLEWAER   =====-----

// --  Populate user and book  --
reviewSchema.pre(/^find/, function (next){

    this.populate({
        path: 'user',
        select: 'name'
    });

    next();
});

// -----====   STATIC METHODS   =====-----

//  -- Geting all ratings, calculating average and storing DB  --
//  Creating stats for the book with bookId for which the current review was created:
reviewSchema.statics.calcAverageRatings = async function(bookId){

    // Selecting all reviews for the book and calculating statistics
    const stats = await this.aggregate([
        {
            $match: {book: bookId}
        },
        {
            $group: {
                _id: '$book',
                nRating: { $sum: 1},
                avgRating: { $avg: '$rating'}
            }
        }
    ]);
    
    // Save the stats in the current tour
    await Book.findByIdAndUpdate(bookId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating
    });
}

//  --  Calling the calcAverageRatings after review is saved
reviewSchema.post('save', function() {
    this.constructor.calcAverageRatings(this.book);
});

// -----====   CREATE AND EXPORT THE REVIEW   =====-----

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;