const express = require('express');
const authmiddleware = require('../middlewares/authCommumUser');
const bcrypt = require('bcryptjs');

const Category = require('../models/Category');
const Scale = require('../models/Scale');
const Question = require('../models/Category');
const AnswersOfPeople = require('../models/AnswersOfPeople');
const Answer = require('../models/Answer');
const People = require('../models/People');


async function answerScale(req, res) {
    const { peopleId, scaleId, answers } = req.body;

    try {
        const people = await People.findById(peopleId);
        const scale = await Scale.findById(scaleId);

        const lastAnswerOfPeople = await AnswersOfPeople.findOne({ scale, people });

        if (lastAnswerOfPeople != null) {

            lastAnswerOfPeople.answers.map(async a => {

                await Answer.deleteOne({ '_id': a})

            })
            await a.deleteOne();
        }


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
        const performance = parseFloat(generatePerformance(aops, answersOfPeople.average)).toFixed(2);
        console.log(performance);
        

        return res.send({ avarege: answersOfPeople.average, performance: performance + '%' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error answer scale' });
    }
}
function generatePerformance(aops, media) {
    var total = aops.length;//2
    var countPeoples = 0
    aops.map(aop => {
        if (aop.average <= media) {
            countPeoples++;
        }
    });
    console.log(countPeoples);
    console.log(total);
    
    if (total <= 1)
        return 100;

    return (countPeoples * 100) / total;
}

function generateAverage(scale, respPeople) {
    var respTotal = scale.maxScaleValue * scale.questions.length;
    var media = (respPeople * 10) / respTotal;
    return media;
}

async function getAnswerOfPeople(req, res){
    const {peopleId, scaleId} = req.body;
    try {

        const aop = await AnswersOfPeople.findOne({ 'people': peopleId, 'scale': scaleId });
        const aops = await AnswersOfPeople.find({ 'scale': scaleId });
        const performance = parseFloat(generatePerformance(aops));

        return res.send({aop, performance: performance + '%'});
    } catch (error) {
        return res.status(400).send({Error: 'Error get answer of people'});
    }


}



module.exports = { answerScale, getAnswerOfPeople };