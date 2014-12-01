/**
 * Module dependencies.
 */

var mongoose = require('mongoose');


module.exports = function (app) {

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
	 * Methods
	 */
	questionSchema.methods.speak = function () {
	  console.log('Hello World');
	}


	questionSchema.methods.getQuestions = function(){ 
	    return Question.find({ QuestionId: this._id });
	};


	/**
	 * Model for the Schema
	 */
	var Question = mongoose.model('Question', questionSchema);

	var testing = new Question({ name: 'Silence' })
	console.log(testing.name) // 'Silence'
	testing.speak();

	/**
	 * Virtuals
	 */

	/**
	 * Validations
	 */


}