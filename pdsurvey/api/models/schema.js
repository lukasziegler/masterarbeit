var mongoose = require('mongoose');

var QuestionTypeSchema = mongoose.Schema({ 
        name: { type: String, required: true },
        description: { type: String, required: true },
        parameters: String,
        constraints: String
});

var QuestionSchema = mongoose.Schema({ 
        type: { type: String },
        name: { type: String, required: true },
        description: { type: String, required: true },
        explanation: String,
        category: { type: String, required: true },
        state: { type: String, enum: ['A', 'B', 'C'] }
});


module.exports = {
  Question: QuestionSchema,
  QuestionType: QuestionTypeSchema
}