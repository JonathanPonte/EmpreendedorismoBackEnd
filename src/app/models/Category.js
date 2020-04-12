const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    scales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scale'
    }],
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
