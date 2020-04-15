const express = require('express');
const authmiddleware = require('../middlewares/authCommumUser');
const bcrypt = require('bcryptjs');

const Category = require('../models/Category');
const Scale = require('../models/Category');
const Question = require('../models/Category');
const AnswersOfPeople = require('../models/AnswersOfPeople');
const Answer = require('../models/Answer');
const People = require('../models/People');


const router = express.Router();


router.use(authmiddleware);

async function answerScale(req, res) {
    const { peopleId, scaleId, answers } = req.body;

    try {
        const people = await People.findById(peopleId);
        const scale = await Scale.findById(scaleId);
        const answersOfPeople = await AnswersOfPeople.create();
        answersOfPeople.people = people;
        answersOfPeople.scale = scale;
        answersOfPeople.answers = answers;
        var questions = scale.questions;
        var sumResul = 0;

        await Promise.all(questions.map(async q => {
            answers.map(async a => {
                const { result, question } = a;
                if (q._id == a.question._id) {
                    sumResul += result;
                    const answerF = await Answer.create(result)
                    answerF.question = question;
                    answerF.answersOfPeople = answersOfPeople;
                    await answerF.save();
                    q.answer.push(answerF);
                    await q.save();
                }
            })
        }))

        await scale.save()

        //gerar media;

        return res.send();
    } catch (error) {
        return res.status(400).send({ error: 'Error answer scale' });
    }
}


module.exports = { answerScale }