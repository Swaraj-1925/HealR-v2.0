// regularUserAuthStrategy.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./Schema');
const validPassword = require('./passwordUtils').validPassword;
const User = connection.models.User;

const verifyRegularUser = async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });

        if (user) {
            const isValid = validPassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }

        return done(null, false);
    } catch (err) {
        return done(err);
    }
};

const regularUserAuthStrategy = new LocalStrategy(verifyRegularUser);

passport.use(regularUserAuthStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err));
});
