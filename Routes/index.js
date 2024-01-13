const router = require('express').Router();
const passport = require('passport');
const genPassword = require('./../config/passwordUtils').genPassword;
const connection = require('./../config/Schema');

const User = connection.models.User;


router.post('/healR/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
   
      return next(err);
    }
    if (!user) {
      
      return res.send('Invalid credentials');
    }
   
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
    
      return res.send('authorized');
    });
  })(req, res, next);
});



router.post('/healR/join', async (req, res, next) => {
  try {
      const saltHash = genPassword(req.body.password);
      const salt = saltHash.salt;
      const hash = saltHash.hash;

      const existingUser = await User.findOne({ username: req.body.username });

      if (existingUser) {
          return res.send("Email already exists");
      }

      const newUser = new User({
          username: req.body.username,
          name: req.body.name,
          age: req.body.age,
          Profession: req.body.profession,
          hash: hash,
          salt: salt
      });

      await newUser.save();
      console.log(newUser);

      return res.send('authorized');
  } catch (error) {
      console.error(error);
      return res.status(500).send('Error creating user');
  }
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});



router.get('/', (req, res, next) => {
 res.render("landing")
});
router.get('/signup', (req, res, next) => {
  res.render("signup")
 });
 
router.get('/signin', (req, res, next) => {
  res.render("signin")
 });
 
router.get('/healR/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
      if (req.user) { // Ensure user object exists
          const userData = {
              name: req.user.name,
              appointmentStatus: req.user.appointmentStatus
          };
          res.render('dashboard', { userData });
      } else {
          console.error('User object not found in request');
          res.status(500).send('Internal server error');
      }
  } else {
      res.status(401).json({ message: 'Unauthorized' });
  }
});
module.exports = router;