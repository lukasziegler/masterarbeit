var mongoose = require('mongoose');
var Schema = require("./schema");

/** 
 * Methods
 */

exports.find = function(query, callback) {
	QuestionModel.find(query, function(err, questions) {
		if(err) return callback(err);
		callback(null, questions);
	});
}
// if(questions.length > 0) callback(null, questions)
// 	else {callback(new Error("No questions found"))}


exports.create = function(req, callback) {
	var newQuestion = new QuestionModel({
		name: req.body.name,
		description: req.body.description
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

/**
 * Virtuals
 */

/**
 * Validations
 */

 /**
 * Model for Schema
 */

