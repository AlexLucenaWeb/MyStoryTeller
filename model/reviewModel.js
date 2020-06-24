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

// -----====   REVIEW INDEXES   =====-----

//  -- Creating index to just let a user review a book once -- 
reviewSchema.index({ book: 1, user: 1 }, { unique: true });


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
    if (stats.length > 0) {
        await Book.findByIdAndUpdate(bookId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else { // Back to default values if all reviews are deleted:
        await Book.findByIdAndUpdate(bookId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        });
    }
}

//  --  Calling the calcAverageRatings after review is saved  --
reviewSchema.post('save', function() {
    this.constructor.calcAverageRatings(this.book);
});

//  --  Calculating Rating Average in case of review changed or deleted -- 
//  Geting the id with a pre function:
reviewSchema.pre(/^findOneAnd/ , async function(next){
    this.rev = await this.findOne();
    next();
});

//  Updating statistics with post:
reviewSchema.post(/^findOneAnd/ , async function(){
    await this.rev.constructor.calcAverageRatings(this.rev.book[0]);
});

// -----====   CREATE AND EXPORT THE REVIEW   =====-----

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;