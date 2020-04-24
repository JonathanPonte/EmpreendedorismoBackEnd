const express = require('express');
const router = express.Router();
const superAdmController = require('../controllers/superAdmController');
const authmiddleware = require('../middlewares/authSuperAdm');
const multer = require('multer');
const multerConfig = require('../../modules/multer/multerConfig');

//router.use(authmiddleware);


router.post('/', async (req, res) => {
    return superAdmController.createSuperAdm(req, res);
});

router.put('/change_password', async (req, res) => {
    return superAdmController.resetPassword(req, res);
});

router.post('/collector', async (req, res) => {
    return superAdmController.createCollectorAdm(req, res);
});

router.post('/image', multer(multerConfig).single('file'), async (req, res) => {
    return superAdmController.uploadImage(req, res);
});

router.get('/image/:fileName', async (req, res) => {
    return admController.getImage(req, res);
})

router.post('/category', async (req, res) => {
    return superAdmController.createCategory(req, res);
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