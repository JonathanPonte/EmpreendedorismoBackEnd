const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const AnswerSchema = new mongoose.Schema({
    result: {
        type: Number,
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    answerOfPeople: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnswerOfPeople'
    },
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
