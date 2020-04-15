const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', async (req, res) => {
    return authController.registerUser(req, res);
});

router.post('/login', async (req, res) => {
    return authController.login(req, res);
});

router.get('/categorys', async (req, res) => {
   return authController.listCategorys(req, res);  
});


module.exports = app => app.use('/auth', router);