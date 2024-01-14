const router = require('express').Router();
const passport = require('passport');
const genPassword = require('./../config/passwordUtils').genPassword;
const connection = require('./../config/Schema');
<<<<<<< HEAD
const usercred = connection.models.usercred; 
const User = connection.models.User;

=======

const User = connection.models.User;

>>>>>>> parent of 867a77c (compelted doctore store data on storage and on bloob and verfication page comepted one issue not saving avalable time in array)

router.post('signin', (req, res, next) => {
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



router.post('/signup', async (req, res, next) => {
  console.log(req.body)
<<<<<<< HEAD
=======
  res.p
>>>>>>> parent of 867a77c (compelted doctore store data on storage and on bloob and verfication page comepted one issue not saving avalable time in array)
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
<<<<<<< HEAD
          
      });   
      const newUsercred = new usercred({
        username: req.body.username,
        role: "patient",
        hash: hash,
        salt: salt
      })

      await newUser.save();
      await newUsercred.save();
      console.log(newUser);
      console.log(newUsercred);

      passport.authenticate("local")(req,res,function(){
        res.redirect('/dashboard')
      })
=======
          hash: hash,
          salt: salt
      });

      await newUser.save();
      console.log(newUser);
>>>>>>> parent of 867a77c (compelted doctore store data on storage and on bloob and verfication page comepted one issue not saving avalable time in array)
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
 
<<<<<<< HEAD
router.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
      if (req.user) { 
=======
router.get('/healR/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
      if (req.user) { // Ensure user object exists
>>>>>>> parent of 867a77c (compelted doctore store data on storage and on bloob and verfication page comepted one issue not saving avalable time in array)
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