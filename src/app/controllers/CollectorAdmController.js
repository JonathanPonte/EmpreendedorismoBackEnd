const express = require('express');
const authmiddleware = require('../middlewares/authColletorAdm');
const bcrypt = require('bcryptjs');
const path = require('path');

const createCsvWriter = require('csv-writer').createObjectCsvWriter
const Scale = require('../models/Scale');
const AsnwersOfPeople = require('../models/AnswersOfPeople');

const router = express.Router();


// get .csv file
async function getCsvFile(req, res) {
    const headerItens = [];
    headerItens.push({ id: 'email', title: 'Email' });

    try {
        const scale = await Scale.findById(req.params.scaleId).populate(['questions']);

        if (!scale)
            return res.status(400).send({ error: 'Scale does not exists' });

        await Promise.all(scale.questions.map(question => {
            const id = question._id;
            const title = question.title;
            headerItens.push({ id, title });
        }))

        const data = [];
        const asnwersOfPeoples = await AsnwersOfPeople.find({ scale: scale }).populate(['people', 'answers']);


        await Promise.all(asnwersOfPeoples.map(aop => {
            var item = {};
            item["email"] = aop.people.name;

            headerItens.map(header => {
                aop.answers.map(answer => {

                    if (header.id == answer.question.toString()) {

                        item[header.id] = answer.result;

                    }

                })
            })

            data.push(item);

        }));

        console.log(headerItens)
        console.log(data)

        const pathFile = "src/data/"; 
        const fileName = scale.title + ".csv";
        const pathName = pathFile + fileName;


        const csvWriter = createCsvWriter({
            path: pathName,
            header: headerItens
        });

        await csvWriter.writeRecords(data)

    
        return res.sendFile(path.join(__dirname, "../../data/" + fileName));
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error answer scale' });
    }

}

module.exports = { getCsvFile };