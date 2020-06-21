const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// ----=====     USER ESCHEMA    =====-----
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please writte a name'],
        unique: true,
        trim: true,
        maxlength: [30, 'A user name must have less or equal then 30 characters'],
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
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        maxlength: [20, 'A user password must have less or equal then 20 characters'],
        minlength: [4, 'A user password must have more or equal then 8 characters'],
        select: false
    },
    passwordConfirmation: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This costume validator only works on CREATE or SAVE
            // Checking if passwords match.
            validator: function(el){
                return el === this.password;
            },
            message: 'Passwords dont match.'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }

});

// -----=====   USER DATA FUNCTIONS   =====-----

// --  Encripting password  --
userSchema.pre('save', async function(next){
    // Only run function if password is modified:
    if(!this.isModified('password')) return next();

    // Encripting using bcrypt:
    this.password = await bcrypt.hash(this.password, 12);

    // Delete pass confirmation in the database:
    this.passwordConfirmation = undefined;
    next();
});

// --  Update the password  --
userSchema.pre('save', function (next) {
    // If the pass wanst be modified or is a new domcument, go on:
    if(!this.isModified('password') || this.isNew) return next();

    // If it was modified (+1 sec for token comparation)
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// -- Filtering inactive users --
userSchema.pre(/^find/, function (next){
    this.find({active: { $ne: false } });
    next();
});

// --  Comparing passwords --
userSchema.methods.correctPass = async function(
    candidatePass, 
    userPass
) {
    return await bcrypt.compare(candidatePass, userPass);
};

//   -- Checking if the password was changed --
userSchema.methods.changedPassAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        // change the passwordChangedAt to timestamp
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        // If this is true, the pass was changed, false was not changed:
        return JWTTimestamp < changedTimestamp;
    }
    // Falese = Pass dont changed
    return false;
};

// -- Generate random token --
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

        console.log({resetToken}, this.passwordResetToken);

    // Token expires in 10 min
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;    

    return resetToken;
};



// -----====   CREATE AND EXPORT THE USER   =====-----
const User = mongoose.model('User', userSchema);

module.exports = User;