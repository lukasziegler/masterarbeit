var mongoose = require('mongoose');

/**
 * Schema
 */
var QuestionSchema = mongoose.Schema({ 
        type: { type: String, required: true },
        shortName: { type: String, required: true },
        description: String,
        explanation: String,
        category: String,
        status: String
});

/**
 * Model for the Schema
 */

var QuestionModel = mongoose.model('Question', QuestionSchema, 'questions');

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


exports.add = function(req, callback) {
	var newQuestion = new QuestionModel({
		type: req.body.type,
		shortName: req.body.shortName,
		description: req.body.description,
		explanation: req.body.explanation,
		category: req.body.category,
		status: req.body.status
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


module.exports = QuestionModel;
