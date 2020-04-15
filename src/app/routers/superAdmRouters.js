const express = require('express');
const router = express.Router();
const superAdmController = require('../controllers/superAdmController');
const authmiddleware = require('../middlewares/authSuperAdm');

router.use(authmiddleware);


router.post('/', async (req, res) => {
    return superAdmController.createSuperAdm(req, res);
});

router.put('/reset_password', async (req, res) => {
    return superAdmController.resetPassword(req, res);
});

router.post('/collector', async (req, res) => {
    return superAdmController.createCollectorAdm(req, res);
});

router.post('/category', async (req, res) => {
    return superAdmController.createCatrgory(req, res);
});

router.put('/category/:categoryId', async (req, res) => {
    return superAdmController.updateCategory(req, res);
});

router.delete('/category/:categoryId', async (req, res) => {
    return superAdmController.deleteCategory(req, res);
});

router.post('/scale', async (req, res) => {
    return superAdmController.createScale(req, res);
});

router.delete('/scale/:scaleId', async (req, res) => {
    return superAdmController.deleteScale(req, res);
});

module.exports = app => app.use('/adm', router);