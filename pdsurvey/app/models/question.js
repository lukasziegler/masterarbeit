var mongoose = require('mongoose');

/**
 * Schema
 */
var QuestionSchema = mongoose.Schema({ 
        type: String,
        shortName: String,
        description: String,
        explanation: String,
        category: String,
        status: String
});

/**
 * Model for the Schema
 */

var Question = mongoose.model('questions', QuestionSchema);

/** 
 * Methods
 */

exports.find = function(query, callback) {
	Question.find(query, function(err, questions) {
		if(err) return callback(err);
		callback(null, questions);
	});
}

exports.add = function(newQuestion, callback) {

	// var newQuestion = new Question({ shortName: 'Mucki' })
	// Save new object to MongoDB
	newQuestion.save(function (err, created) {
		if(err) return callback(err);
		callback(null, created);
	});

	// Question.create({ type: 'jelly bean' }, function(err, created) {
};


// 	if(err) return callback(err);
// //TODO überlegen ob in DB, in Console oder in File, oder in Error Handling
// if(questions.length > 0) callback(null, questions)
// 	else {callback(new Error("No questions found"))}
// 		// TODO überlegen ob leere Arrays oder Errors zurücksenden


/**
 * Virtuals
 */

/**
 * Validations
 */


