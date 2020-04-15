const express = require('express');
const router = express.Router();
const collectorController = require('../controllers/CollectorAdmController');
const authmiddleware = require('../middlewares/authColletorAdm');

router.use(authmiddleware);

router.get('/scale/:scaleId', async (req, res) => {
    return collectorController.getCsvFile(req, res);
});

module.exports = app => app.use('/collector', router);