const express = require('express');
const router = express.Router();
const CommumUserController = require('../controllers/CommumUserController');
const authmiddleware = require('../middlewares/authCommumUser');

//router.use(authmiddleware);

// Rota de resposta de escala usuario commum
router.post('/scale', async (req, res) => {
    return CommumUserController.answerScale(req, res);
});

module.exports = app => app.use('/user', router);