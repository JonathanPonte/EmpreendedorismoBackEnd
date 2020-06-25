const express = require('express');
const router = express.Router();
const collectorController = require('../controllers/CollectorAdmController');
const authmiddleware = require('../middlewares/authColletorAdm');

//router.use(authmiddleware);

//get Csv de uma escala
router.get('/scale/:scaleId', collectorController.getCsvFile);

module.exports = app => app.use('/collector', router);