const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./Schema');
const User = connection.models.User; 
const validPassword = require('./passwordUtils').validPassword;
const Doc = connection.models.Doc;
const verifyCallback = async (username, password, done) => {
    console.log('Verifying user:', username);
  
    try {
      // Check in the User collection
      const user = await User.findOne({ username: username });
  
      if (user) {
        const isValid = validPassword(password, user.hash, user.salt);
  
        if (isValid) {
          console.log('Authentication successful for regular user:', username);
          return done(null, user);
        } else {
          console.log('Invalid password for regular user:', username);
          return done(null, false);
        }
      }
  
      // If not found in the User collection, check in the Doc collection
      const doc = await Doc.findOne({ username: username });
  
      if (doc) {
        const isValid = validPassword(password, doc.hash, doc.salt);
  
        if (isValid) {
          console.log('Authentication successful for doctor:', username);
          return done(null, doc);
        } else {
          console.log('Invalid password for doctor:', username);
          return done(null, false);
        }
      }
  
      // User not found in both collections
      console.log('User not found:', username);
      return done(null, false);
    } catch (err) {
      console.error('Error during authentication:', err);
      return done(err);
    }
  };
  


const strategy  = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    
    done(null, { id: user.id, role: user.role });
});
;
  
  passport.deserializeUser(async (serializedUser, done) => {
    try {
        const user = await (serializedUser.role === 'doctor' ? Doc : User).findById(serializedUser.id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
  
