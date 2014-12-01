
var mongoose = require('mongoose');

/**
 * Schema
 */
var questionSchema = mongoose.Schema({ 
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

var Question = mongoose.model('Question', questionSchema);

/** 
 * Methods
 */

exports.find = function(query, callback) {
	Question.find(query, function(err, questions) {
		if(err) return callback(err);
		callback(null, questions);
	});

}

exports.add = function(callback) {
	Question.create({ type: 'jelly bean' }, function(err, created) {
		if(err) return callback(err);
		callback(null, created);
	});
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


