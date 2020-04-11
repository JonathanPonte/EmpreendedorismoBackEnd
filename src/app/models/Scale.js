const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const ScaleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    minScaleValue: {
        type: Number,
        required: true
    },
    maxScaleValue: {
        type: Number,
        required: true
    },
    correctScores: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        require: true
    }],
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

const Scale = mongoose.model('Scale', ScaleSchema);

module.exports = Scale;
