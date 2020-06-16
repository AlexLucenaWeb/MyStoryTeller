const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A book must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A book name must have less or equal then 40 characters'],
        minlength: [5, 'A book name must have more or equal then 10 characters']
    },
    category:{
        type: String,
        required: [true, 'A book must have a category'],
        enum: {
            values: ['nature', 'home', 'family', 'friends', 'holidais', 'school', 'music', 'animals', "routines"],
            message: 'Category is either: nature, home, family, friends, holidais, school, music, routines or animals'
          }
    },
    age: {
        type: String,
        required: [true, 'The book must have a recomended age'],
        trim: true
    },
    free: { 
        type: Boolean,
        default: false
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']  
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        //required: [true, 'A tour must have a cover image']
    },
    images: [String],
    music: [String],
    voice: [String],
    text: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    slug: String
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Moongose document middleware:

// Runs before .save() and .create()
bookSchema.pre('save', function(next){ // Using regular funcitons instead => to use this.
    // Creating an Slug based on the name using slugify.
    this.slug = slugify(this.name, {lower: true});
    next();
});

// Runs after .save() and .create()
// bookSchema.post('save', function(doc, next) {
//     // console.log(doc);
//     next();
// })

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;