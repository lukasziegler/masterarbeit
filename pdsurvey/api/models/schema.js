var mongoose = require('mongoose');


/* QUESTION TYPE */
exports.QuestionType = mongoose.Schema({ 
        name: { type: String, required: true },
        description: { type: String, required: true },
        parameters: String,
        constraints: String
});

/* QUESTION */
exports.Question = mongoose.Schema({ 
        type: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'QuestionType'
        },
        name: { type: String, required: true },
        description: { type: String, required: true },
        explanation: String,
        category: { type: String, required: true },
        state: { type: String, enum: ['A', 'B', 'C', 'pending', 'public'] }
});

/* USER */
exports.User = mongoose.Schema({ 
        username: { type: String, required: true },
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        rights: String,
        dateRegistered: { type: Date, default: Date.now },
        hashed_password: String,
        salt: String,
        authToken: String
});
