const mongoose = require('../../database');

const AdmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    type: {
        type: Number,
        require: true
    },
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

const Adm = mongoose.model('Adm', AdmSchema);

module.exports = Adm;
