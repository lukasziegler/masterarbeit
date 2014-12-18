var mongoose = require('mongoose');
var Schema = require("./schema");

/** 
 * Methods
 */

exports.find = function(query, callback) {
	QuestionTypeModel.find(query, function(err, questionTypes) {
		if(err) return callback(err);
		callback(null, questionTypes);
	});
}

exports.create = function(req, callback) {
	var newQuestion = new QuestionTypeModel({
		name: req.body.name,
		description: req.body.description,
		parameters: req.body.parameters,
		constraints: req.body.constraints,
	});
	// Save new object to MongoDB
	newQuestion.save(function (err, created) {
		if(err) return callback(err);
		callback(null, created);
	});
};

 /**
 * Model for the Schema
 */

module.exports = mongoose.model('QuestionType', Schema.QuestionType, 'questionTypes');