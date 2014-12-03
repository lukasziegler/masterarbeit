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
var UserModel = mongoose.model('User', UserSchema, 'users');

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
	UserModel.find(query, function(err, user) {
		if(err) return callback(err);
		callback(null, user);
	});
}

exports.add = function(req, callback) {
	var newUser = new UserModel({
		username: req.body.username,
		fullname: req.body.fullname,
		email: req.body.email
	});
	// Save new object to MongoDB
	newUser.save(function (err, created) {
		if(err) return callback(err);
		callback(null, created);
	});

	  // user.save(function (err) {
	  //   if (!err) {
	  //     return console.log("User created");
	  //   } else {
	  //     return console.log(err);
	  //   }
 	 // });
};

exports = UserModel;