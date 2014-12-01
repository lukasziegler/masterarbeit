/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

/**
 * User Schema
 */

var UserSchema = mongoose.Schema({ 
        username: { type: String, required: true },
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        rights: String,
        dateRegistered: { type: Date, default: Date.now },
        hashed_password: String,
        salt: String,
        authToken: String
});

/**
 * Virtuals
 */


/**
 * Validations
 */


/**
 * Methods
 */



module.exports = mongoose.model('Users', UserSchema);