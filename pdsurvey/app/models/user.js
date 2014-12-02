var mongoose = require('mongoose');

/**
 * Schema
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
 * Model for the Schema
 */
var User = mongoose.model('users', UserSchema);
module.exports = User;

/**
 * Virtuals
 */


/**
 * Validations
 */


/**
 * Methods
 */

exports.find = function(query, callback) {
	User.find(query, function(err, user) {
		if(err) return callback(err);
		callback(null, user);
	});
}

exports.add = function(newUser, callback) {
	// var newUser = new User({ shortName: 'Mucki' })
	// Save new object to MongoDB
	newUser.save(function (err, created) {
		if(err) return callback(err);
		callback(null, created);
	});
};

