const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../config/Schema');
const usercred = connection.models.usercred;
const validPassword = require('../config/passwordUtils').validPassword;

const verifyCallback = (username, password, done) => {

  usercred.findOne({ username: username })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            const isValid = validPassword(password, user.hash, user.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy( verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  usercred.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
