const express = require('express');
const authmiddleware = require('../middlewares/authCommumUser');
const bcrypt = require('bcryptjs');

const Category = require('../models/Category');
const Scale = require('../models/Scale');
const Question = require('../models/Category');
const AnswersOfPeople = require('../models/AnswersOfPeople');
const Answer = require('../models/Answer');
const People = require('../models/People');


//router.use(authmiddleware);

async function answerScale(req, res) {
    const { peopleId, scaleId, answers } = req.body;

    

    try {
        const people = await People.findById(peopleId);
        const scale = await Scale.findById(scaleId);
    
        const answersOfPeople = new AnswersOfPeople();
        answersOfPeople.people = people;
        answersOfPeople.scale = scale;
        const answersP = []
        await Promise.all(answers.map(async a => {
            const eachAnswer = new Answer()
            eachAnswer.result = a.result
            eachAnswer.question = a.question
            await eachAnswer.save()
            answersP.push(eachAnswer);
        }))
        answersOfPeople.answers = answersP;
        await answersOfPeople.save(); 
        

        //gerar media;

        return res.send({ answersOfPeople });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error answer scale' });
    }
}


module.exports = { answerScale }