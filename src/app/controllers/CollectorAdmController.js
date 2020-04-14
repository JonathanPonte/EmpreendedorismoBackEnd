const express = require('express');
const authmiddleware = require('../middlewares/authColletorAdm');
const bcrypt = require('bcryptjs');

const createCsvWriter = require('csv-writer').createObjectCsvWriter

const Scale = require('../models/Scale');

const router = express.Router();


router.use(authmiddleware);

// get .csv file
router.get('/scale/:scaleId', async (req, res) => {
    const headerItems = [];
    headerItem.push({ id: 'email', name: 'Email' });

    try {
        const scale = await Scale.findById(req.params.scaleId).populate(['questions']);

        if (!scale)
            return res.status(400).send({ error: 'Scale does not exists' });

        await Promise.all(scale.questions.map(question => {
            const id = question.title;
            const name = question.title;
            headerItem.push({ id, name });
        }))

        const data = [];
        
        //criar corpo do csv
        //https://stackoverflow.com/questions/16507222/create-json-object-dynamically-via-javascript-without-concate-strings

        console.log(headerItem);

        return res.send({ scale });
    } catch (error) {
        return res.status(400).send({ error: 'Error answer scale' });
    }

});


module.exports = app => app.use('/collector', router);