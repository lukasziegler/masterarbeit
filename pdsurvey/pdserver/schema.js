var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


/* QUESTION TYPE */
var QuestionTypeSchema = mongoose.Schema({ 
    name: { type: String, required: true },
    description: { type: String, required: true },
    // abbreviation: { type: String, required: true },
    params: mongoose.Schema.Types.Mixed,
    constraints: String
});
exports.QuestionTypeModel = mongoose.model('QuestionType', QuestionTypeSchema, 'questionTypes');


/* QUESTION */
var QuestionSchema = mongoose.Schema({ 
    type: { type: ObjectId, ref: 'QuestionType', required: true },
    name: { type: String, required: true },
    explanation: String,
    category: { type: ObjectId, ref: 'Category', required: true }
    // state: { type: String, enum: ['A', 'B', 'C', 'pending', 'limited', 'public'] }
});
exports.QuestionModel = mongoose.model('Question', QuestionSchema, 'questions');


/* RESPONSES */
var ResponseSchema = mongoose.Schema({ 
    question: { 
        id: { type: ObjectId, ref: 'Question' },
        type: { type: ObjectId, ref: 'QuestionType', required: true },
        wording: { type: String }
    },
    answer: { type: String, required: true },
    display: { type: ObjectId, ref: 'Display' },
    campaign: { type: ObjectId, ref: 'Campaign' },
    survey: { type: ObjectId, ref: 'Survey', required: true },
    session: { type: Number },
    timestamp: { type: Date, default: Date.now }
});
exports.ResponseModel = mongoose.model('Response', ResponseSchema, 'responses');


/* CATEGORY */
var CategorySchema = mongoose.Schema({ 
    name: { type: String, required: true },
    description: { type: String }
});
exports.CategoryModel = mongoose.model('Category', CategorySchema, 'categories');


/* SURVEY (currently only QUESTIONNAIRES) */
var SurveySchema = mongoose.Schema({ 
    name: { type: String, required: true },
    category: { type: ObjectId, ref: 'Category', required: true},
    state: { type: String, enum: ['standardized', 'personal', 'suggested', 'approved'], default: 'personal' },
    description: { type: String },

    sections: [{
        name: String,
        // position: Number,
        questions: [{
            question: { type: String, required: true },
            // position: Number,
            type: { type: ObjectId, ref: 'QuestionType', required: true }
        }]
    }],

    maxQuestions: Number,
    createdBy: { type: ObjectId, ref: 'User' },
    dateCreated: { type: Date, default: Date.now },
    lastChange: { type: Date, default: Date.now }
});
exports.SurveyModel = mongoose.model('Survey', SurveySchema, 'surveys');


/* DISPLAY MODELS */
var DisplayModelSchema = mongoose.Schema({ 
    name: { type: String, required: true },
    producer: String,
    url: String,
    characteristics: String,
    contextStatic: [String]
});
exports.DisplayModelModel = mongoose.model('DisplayModel', DisplayModelSchema, 'displayModels');


/* DISPLAYS (per User) */
var DisplaySchema = mongoose.Schema({ 
    name: { type: String, required: true },
    displayModel: { type: ObjectId, ref: 'DisplayModel', required: true },
    user: { type: ObjectId, ref: 'User' },
    location: String,
    contextDynamic: [mongoose.Schema.Types.Mixed]
});
exports.DisplayModel = mongoose.model('Display', DisplaySchema, 'displays');


/* CAMPAIGNS */
var CampaignSchema = mongoose.Schema({ 
    name: { type: String, required: true },
    description: String,
    startDate: { type: Date },
    endDate: { type: Date },
    content: { type: String },
    location: { type: String },
    displays: [{ type: ObjectId, ref: 'Display' }],
    surveys: [{ type: ObjectId, ref: 'Survey' }],
    contextDynamic: [mongoose.Schema.Types.Mixed],
    minResponses: Number,
    numQuestionsPerPage: Number,
    randomized: { type: Boolean, default: false },
    launched: { type: Boolean, default: false },
    createdBy: { type: ObjectId, ref: 'User' },
    dateCreated: { type: Date, default: Date.now }
});
exports.CampaignModel = mongoose.model('Campaign', CampaignSchema, 'campaigns');


/* CONTEXT */
var ContextSchema = mongoose.Schema({ 
    type: { type: String, required: true, enum: ['static', 'dynamic'] },
    name: { type: String, required: true }
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

