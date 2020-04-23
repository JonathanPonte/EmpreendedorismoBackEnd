const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const configFace = require('../../modules/facebook/facebookConfig')


router.post('/register', async (req, res) => {
    return authController.registerUser(req, res);
});

router.post('/login', async (req, res) => {
    return authController.login(req, res);
});

router.get('/categorys', async (req, res) => {
    return authController.listCategorys(req, res);
});


router.get('/facebook', passport.authenticate('facebook'));

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: 'http://localhost:3000/auth',
        failureRedirect: 'http://localhost:3000/auth/fail'
    })
);


router.get('/fail', (req, res) => {
    res.send("Failed attempt");
});

router.get('/', (req, res) => {
    console.log(req.profile);
    res.send("Success");
});



module.exports = app => app.use('/auth', router);