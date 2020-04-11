const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const AdmTypesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    typeId: {
        //forma que o mongo guarda um objeto no banco
        type: Number,
        require: true
    },
    cratedAt: {
        type: Date,
        default: Date.now,
    }
});

const AdmTypes = mongoose.model('AdmTypes', AdmTypesSchema);

module.exports = AdmTypes;
