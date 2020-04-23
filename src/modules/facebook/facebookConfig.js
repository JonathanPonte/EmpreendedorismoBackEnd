const passport = require('passport');
//const dotenv = require('dotenv');
const strategy = require('passport-facebook');

const User = require('../../app/models/User');
const People = require('../../app/models/People');
const authConfig = require('../../config/auth.json');

const FacebookStrategy = strategy.Strategy;

passport.initialize();
//dotenv.config();
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use('facebook',
    new FacebookStrategy(
        {
            clientID: authConfig.FACEBOOK_CLIENT_ID,
            clientSecret: authConfig.FACEBOOK_CLIENT_SECRET,
            callbackURL: authConfig.FACEBOOK_CALLBACK_URL,
            profileFields: ["email", "name"]
        },
        function (accessToken, refreshToken, profile, done) {
            try {

                //done(null, profile);
                done(null, profile);
            } catch (error) {
                console.log(error)
            }

        }
    )
);