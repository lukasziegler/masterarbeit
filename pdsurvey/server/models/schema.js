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
exports.SurveyModel = mongoose.model('Survey', exports.Survey, 'surveys');


/* DISPLAYS */
var DisplaySchema = mongoose.Schema({ 
    name: { type: String, required: true },
    producer: String,
    url: String,
    characteristics: String,
    contextStatic: [String]
});
exports.DisplayModel = mongoose.model('Display', DisplaySchema, 'displays');


/* CAMPAIGNS */
exports.Campaign = mongoose.Schema({ 
    name: { type: String, required: true },
    description: String,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    display: { type: ObjectId, ref: 'Display' },
    survey: { type: ObjectId, ref: 'Survey' },
    contextDynamic: [String],
    minReponses: Number,
    createdBy: { type: ObjectId, ref: 'User' },
    dateCreated: { type: Date, default: Date.now }
});
exports.CampaignModel = mongoose.model('Campaign', exports.Campaign, 'campaigns');


/* CONTEXT */
var ContextSchema = mongoose.Schema({ 
    type: { type: String, required: true, enum: ['static', 'dynamic'] },
    context: { type: String, required: true }
});
exports.ContextModel = mongoose.model('Context', ContextSchema, 'contexts');


/* USER */
var UserSchema = mongoose.Schema({ 
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    rights: String,
    dateRegistered: { type: Date, default: Date.now },
    hashed_password: String,
    salt: String,
    authToken: String
});
exports.UserModel = mongoose.model('User', UserSchema, 'users');

