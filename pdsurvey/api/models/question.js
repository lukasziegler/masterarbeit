var mongoose = require('mongoose');

/**
 * Schema
 */
var QuestionSchema = mongoose.Schema({ 
        type: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        explanation: String,
        category: { type: String, required: true },
        state: String
});

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

/**
 * Virtuals
 */

/**
 * Validations
 */

 /**
 * Model for the Schema
 */

var QuestionModel = mongoose.model('Question', QuestionSchema, 'questions');

module.exports = QuestionModel;
