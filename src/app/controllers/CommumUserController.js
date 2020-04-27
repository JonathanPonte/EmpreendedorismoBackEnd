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

        await AnswersOfPeople.deleteOne({ scale, people });

        const answersOfPeople = new AnswersOfPeople();
        answersOfPeople.people = people;
        answersOfPeople.scale = scale;
        const answersP = []
        var respPeople = 0;
        var respTotal = scale.maxScaleValue * scale.questions.length;
        var correctScore = scale.correctScores;

        await Promise.all(answers.map(async a => {
            const eachAnswer = new Answer()
            eachAnswer.result = a.result
            eachAnswer.question = a.question
            respPeople = respPeople + a.result;
            await eachAnswer.save()
            answersP.push(eachAnswer);
        }))
        answersOfPeople.answers = answersP;
        await answersOfPeople.save(); 

        const valueBefore = 10/correctScore;
        const valueAfter = 10/((respTotal + 1) - correctScore);
        var media = 0;

        if(respPeople <= correctScore){
            media = respPeople * valueBefore;
        }else{
            media = 10 - ((respPeople - correctScore) * valueAfter);
        }

        return res.send({ media: media });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error answer scale' });
    }
}


module.exports = { answerScale }