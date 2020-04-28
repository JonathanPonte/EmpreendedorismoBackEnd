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

        console.log(scaleId);
        const a = await AnswersOfPeople.deleteOne({ scale, people });
        console.log(a);
        

        const answersOfPeople = new AnswersOfPeople();
        answersOfPeople.people = people;
        answersOfPeople.scale = scale;
        const answersP = []
        var respPeople = 0;

        await Promise.all(answers.map(async a => {
            const eachAnswer = new Answer()
            eachAnswer.result = a.result
            eachAnswer.question = a.question
            respPeople = respPeople + a.result;
            await eachAnswer.save()
            answersP.push(eachAnswer);
        }))
        answersOfPeople.answers = answersP;
        answersOfPeople.average = parseFloat(generateAverage(scale, respPeople).toFixed(2));
        await answersOfPeople.save();
        const aops = await AnswersOfPeople.find({ scale });
        console.log(aops.length); 
        const performance = generatePerformance(aops, answersOfPeople.average);


        return res.send({avarege: answersOfPeople.average, performance: performance });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error answer scale' });
    }
}

function generatePerformance(aops, media) {
    var total = aops.length;//2
    var countPeoples = 0
    console.log(media);
    aops.map(aop => {
        console.log(aop.average);
        if (aop.average <= media) {
            console.log(aop.average);
            countPeoples++;
        }
    });

    if(total == 0)
        return 100;
    
    return (countPeoples * 100) / total;
}

function generateAverage(scale, respPeople) {
    var respTotal = scale.maxScaleValue * scale.questions.length;
    var correctScore = scale.correctScores;
    const valueBefore = 10 / correctScore;
    const valueAfter = 10 / ((respTotal + 1) - correctScore);
    var media = 0;

    if (respPeople <= correctScore) {
        return media = respPeople * valueBefore;
    } else {
        return media = 10 - ((respPeople - correctScore) * valueAfter);
    }
}



module.exports = { answerScale }