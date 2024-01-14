const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./Schema');
const User = connection.models.User; 
const validPassword = require('./passwordUtils').validPassword;
const Doc = connection.models.Doc;

const verifyDoctor = async (username, password, done) => {
    try {
        const doc = await Doc.findOne({ username: username });

        if (doc) {
            const isValid = validPassword(password, doc.hash, doc.salt);

            if (isValid) {
                return done(null, doc);
            } else {
                return done(null, false);
            }
        }

        return done(null, false);
    } catch (err) {
        return done(err);
    }
};

const doctorAuthStrategy = new LocalStrategy(verifyDoctor);

passport.use(doctorAuthStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});