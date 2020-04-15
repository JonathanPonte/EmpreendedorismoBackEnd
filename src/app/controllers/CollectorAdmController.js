const express = require('express');
const authmiddleware = require('../middlewares/authColletorAdm');
const bcrypt = require('bcryptjs');

const createCsvWriter = require('csv-writer').createObjectCsvWriter
const Scale = require('../models/Scale');
const AsnwersOfPeople = require('../models/AnswersOfPeople');

const router = express.Router();


// get .csv file
async function getCsvFile(req, res){
    const headerItens = [];
    headerItens.push({ id: 'email', name: 'Email' });

    try {
        const scale = await Scale.findById(req.params.scaleId).populate(['questions']);

        if (!scale)
            return res.status(400).send({ error: 'Scale does not exists' });

        await Promise.all(scale.questions.map(question => {
            const id = question._id;
            const name = question.title;
            headerItens.push({ id, name });
        }))
        
        const data = [];
        const respUser = {};

        const asnwersOfPeople = await AsnwersOfPeople.find();

        console.log(headerItens);

        return res.send({ scale });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error answer scale'});
    }

}


module.exports = { getCsvFile };