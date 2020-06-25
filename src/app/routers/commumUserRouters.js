const express = require('express');
const router = express.Router();
const CommumUserController = require('../controllers/CommumUserController');
const authmiddleware = require('../middlewares/authCommumUser');

// router.use(authmiddleware);

// Rota de resposta de escala usuario commum
router.post('/scale', CommumUserController.answerScale);

router.get('/answer_of_people', CommumUserController.getAnswerOfPeople);

module.exports = app => app.use('/user', router);