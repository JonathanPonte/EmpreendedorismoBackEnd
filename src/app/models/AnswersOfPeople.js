const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const AnswerOfPeopleSchema = new mongoose.Schema({
    people: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        require: true
    },
    scale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scale',
        require: true
    },
    answer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
        require: true
    }],
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

const AnswerOfPeople = mongoose.model('AnswerOfPeople', AnswerOfPeopleSchema);

module.exports = AnswerOfPeople;
