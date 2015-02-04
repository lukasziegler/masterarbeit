var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


/* QUESTION TYPE */
var QuestionTypeSchema = mongoose.Schema({ 
    name: { type: String, required: true },
    description: { type: String, required: true },
    parameters: String,
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
    questionnaire: { 
        type: { type: String, enum: ['Questionnaire', 'StandardSurvey'] },
        ref: { type: ObjectId }
    },
    display: { type: ObjectId, ref: 'Display', required: true },
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


/* SURVEY (QUESTIONNAIRE) */
var SurveySchema = mongoose.Schema({ 
    name: { type: String, required: true },
    // questions: [Question],
    maxQuestions: Number,
    createdBy: { type: ObjectId, ref: 'User' },
    dateCreated: { type: Date, default: Date.now },
    lastChange: { type: Date, default: Date.now }
});
exports.SurveyModel = mongoose.model('Survey', SurveySchema, 'surveys');


/* STANDARDIZED QUESTIONNAIRE */
var StandardSurveySchema = mongoose.Schema({ 
    name: { type: String, required: true },
    category: { type: ObjectId, ref: 'Category'},
    sections: [{
        name: String,
        // position: Number,
        questions: [{
            question: { type: String, required: true },
            // position: Number,
            type: { type: ObjectId, ref: 'QuestionType', required: true }
        }]
    }],
    description: { type: String }
});
exports.StandardSurveyModel = mongoose.model('StandardSurvey', StandardSurveySchema, 'standardSurvey');


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
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    display: { type: ObjectId, ref: 'Display' },
    survey: { type: ObjectId, ref: 'Survey' },
    contextDynamic: [String],
    minReponses: Number,
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

