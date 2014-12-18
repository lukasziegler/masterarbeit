var mongoose = require('mongoose');

exports.QuestionType = mongoose.Schema({ 
        name: { type: String, required: true },
        description: { type: String, required: true },
        parameters: String,
        constraints: String
});

exports.Question = mongoose.Schema({ 
        type: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'QuestionType'
        },
        name: { type: String, required: true },
        description: { type: String, required: true },
        explanation: String,
        category: { type: String, required: true },
        state: { type: String, enum: ['A', 'B', 'C'] }
});