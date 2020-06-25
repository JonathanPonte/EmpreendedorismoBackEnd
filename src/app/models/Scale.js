const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const ScaleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    informations:{
        type: String,
        required: true
    },
    minLabel: {
        type: String,
        required: true
    },
    maxLabel: {
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
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        require: true
    }],
    extension:{
        type:String,
    },
    image:{
        type:String,
    },
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

const Scale = mongoose.model('Scale', ScaleSchema);

module.exports = Scale;
