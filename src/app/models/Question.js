const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    scale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scale'
    },
    answer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
