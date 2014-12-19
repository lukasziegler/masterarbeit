var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/* QUESTION TYPE */
exports.QuestionType = mongoose.Schema({ 
    name: { type: String, required: true },
    description: { type: String, required: true },
    parameters: String,
    constraints: String
});

/* QUESTION */
exports.Question = mongoose.Schema({ 
    type: { type: ObjectId, ref: 'QuestionType' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    explanation: String,
    category: { type: String, required: true },
    state: { type: String, enum: ['A', 'B', 'C', 'pending', 'public'] }
});

/* CATEGORY */
exports.Category = mongoose.Schema({ 
    name: { type: String, required: true },
    description: { type: String }
});
    // testing, to see if I can define and export my Models in here
exports.CategoryModel = mongoose.model('Category', exports.Category, 'categories');

/* SURVEY */
exports.Survey = mongoose.Schema({ 
    name: { type: String, required: true },
    // questions: [Question],
    maxQuestions: Number,
    createdBy: { type: ObjectId, ref: 'User' },
    dateCreated: { type: Date, default: Date.now },
    lastChange: { type: Date, default: Date.now }
});
    // testing, to see if I can define and export my Models in here
exports.SurveyModel = mongoose.model('Survey', exports.Survey, 'surveys');



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
