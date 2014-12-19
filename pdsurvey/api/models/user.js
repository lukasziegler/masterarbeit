var mongoose = require('mongoose');
var Schema = require("./schema");

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
};


/**
 * Model for Schema
 */

module.exports = mongoose.model('User', Schema.User, 'users');
