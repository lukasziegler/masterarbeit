/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

/**
 * User Schema
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
 * Virtuals
 */

/**
 * Validations
 */

/**
 * Methods
 */



QuestionSchema.methods.getOrders = function(){ 
    return Orders.find({ QuestionId: this._id });
};



var Questions = mongoose.model('Questions', QuestionSchema
);
// modules.export = Questions;