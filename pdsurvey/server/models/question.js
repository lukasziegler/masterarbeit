var mongoose = require('mongoose');
var Schema = require("./schema");

/** 
 * NOTE: THIS FILE IS CURRENTLY NOT BEING USED ANYWHERE
 * 
 * > reason to see alternative approach
 */

exports.find = function(query, callback) {
	QuestionModel.find(query, function(err, questions) {
		if(err) return callback(err);
		callback(null, questions);
	});
}

exports.create = function(req, callback) {
	var newQuestion = new QuestionModel({
		type: req.body.type,
		name: req.body.name,
		description: req.body.description,
		explanation: req.body.explanation,
		category: req.body.category,
		state: req.body.state
	});
	// Save new object to MongoDB
	newQuestion.save(function (err, created) {
		if(err) return callback(err);
		callback(null, created);
	});
};

exports.update = function(req, callback) {
	// TODO
};

exports.delete = function(req, callback) {
	// TODO
};

