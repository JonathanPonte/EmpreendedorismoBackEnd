const express = require('express');
const router = express.Router();
const superAdmController = require('../controllers/superAdmController');
const authmiddleware = require('../middlewares/authSuperAdm');
const multer = require('multer');
const multerConfig = require('../../modules/multer/multerConfig');

// router.use(authmiddleware);

//superAdm
router.post('/', superAdmController.createSuperAdm);
router.get('/', superAdmController.getAdms);
router.put('/change_password', superAdmController.resetPassword);

//Criar
router.post('/collector', superAdmController.createCollectorAdm);

//Categoria 
router.post('/category', superAdmController.createCategory);
router.put('/category/:categoryId', superAdmController.updateCategory);
router.delete('/category/:categoryId', superAdmController.deleteCategory);

//Escala
router.post('/scale', superAdmController.createScale);
router.get('/scale/:id', superAdmController.getScale);
router.put('/scale/:id', superAdmController.updateScale);
router.delete('/scale/:scaleId', superAdmController.deleteScale);
// router.post('/image', multer(multerConfig).single('file'), superAdmController.uploadImage);
router.get('/image/:fileName', superAdmController.getImage);


module.exports = app => app.use('/adm', router);