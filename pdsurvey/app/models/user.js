/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

/**
 * User Schema
 */

var UserSchema = mongoose.Schema({ 
        username: String,
        fullname: String,
        email: String,
        rights: String,
        dateRegistered: String,
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



UserSchema.methods.getOrders = function(){ 
    return Orders.find({ UserId: this._id });
};



var Users = mongoose.model('Users', UserSchema);

module.exports = Users;