const router = require('express').Router();
const passport = require('passport');
const genPassword = require('./../config/passwordUtils').genPassword;
const connection = require('./../config/Schema');
const usercred = connection.models.usercred;
const Doc = connection.models.Doc;
const authRequest = connection.models.authRequest;
const intoStream = require('into-stream');

const docAuth =require('../config/uplodebloob').docAuth;
const docImg =require('../config/uplodebloob').docImg;

// =============== user routes ===============================
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
        res.redirect('dashboard')
      })
  } catch (error) {
      console.error(error);
      return res.status(500).send('Error creating user');
  }
});
// =====================doc routes=================================

router.post('/doc', async (req,res) =>{
  const existingUser = await authRequest.findOne({ username: req.body.username });
      if (existingUser) {
          return res.send("<h4>we are working on your request</h4>");
      }
  var imgname =req.files.doqment.name;
  var dataStream= intoStream (req.files.doqment.data);
  var imageUrl;
  try{
  imageUrl = await docAuth(imgname,dataStream)
  const newauthreq = new authRequest({
    username:req.body.username,
    name:req.body.name,
    docLink:imageUrl,
  });
  await newauthreq.save();
  return res.send('<h4>request has been sent sucsefuly</h4>')
  }catch(err){
    res.send("<h4>some error has ocured trying or Please contact <a href='mailto:healr.society@gmail.com'>healr.society@gmail.com</a> with image of error</h4><p></p>Error:"+err)
  }
});

router.post('/docSignup', async (req, res) => {
  console.log('Request Body:', req.body);
  
  const acceptedTime = req.body.acceptedTime || [];
  var workingdays;
  console.log( req.body.workingdays);
  if(req.body.workingdays =="everyday"){
    workingdays:({
      weekdays:false,
      everyday: true
  })
  }else{
    workingdays:({
      weekdays:true,
      everyday: false
  })

  }
  try {
    const findUser = await authRequest.findOne({ username: req.body.username });
    const checkForAuthentication = await authRequest.findOne({ username: req.body.username, verified: true });

    if (!findUser) {
      res.send("<h4>You haven't made a verification request yet. Please make a request or check your email. The email should be the same as you entered in the verification process.</h4>");
    } else {
      if (!checkForAuthentication) {
        res.send("<h4>we are wroking on your verification </h4>");
      } else {

        const findUser = await Doc.findOne({ username: req.body.username });
        if(!findUser){
        try {
            var imgnameS = req.files.imagesS.name
            var imgnameB = req.files.imagesB.name
            var datastreamS= intoStream (req.files.imagesS.data);
            var datastreamB= intoStream (req.files.imagesB.data);

            const imageurlS =await docImg(imgnameS,datastreamS)
            const imageurlB =await docImg(imgnameB,datastreamB)
          
            if(imageurlS && imageurlB ){
          const saltHash = genPassword(req.body.password);
          const salt = saltHash.salt;
          const hash = saltHash.hash;
        
          const newdoc = new Doc({
            username: req.body.username,
            name: req.body.name,
            Profession: req.body.profession,
            yearOfExperience: req.body.experience,
            about: req.body.about,
            fees: {
              call: req.body.feescall,
              videoCall: req.body.feesvideoCall,
              message: req.body.feesmessage,
              inRealLife: req.body.feesinRealLife,
            },
            wokingdays:workingdays,
            acceptedTime: acceptedTime,
            available: req.body.available || true,
            images:{
              imgS:imageurlS,
              imgB:imageurlB
            },
          });
          const newUsercred = new usercred({
            username: req.body.username,
            role: "doctor",
            hash: hash,
            salt: salt
          })
          await newdoc.save();
          await newUsercred.save();
          passport.authenticate("local")(req,res,function(){
            res.redirect('docdashboard')
          })
        }
        } catch (error) {
          console.error(error);
          res.status(500).send('<h3>Error saving user try again</h3>');
        }
      }else{
        res.send('<h4>Error: user alerdy exist try to login </h4>')
      }
    }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('<h4>Error processing request</h4>');
  }
});



// =================get routes===========================
router.get('/', (req, res, next) => {
 res.render("landing")
});
router.get('/signup', (req, res, next) => {
  res.render("signup")
 });
 
router.get('/signin', (req, res, next) => {
  res.render("signin")
 });
 
router.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
      if (req.user) { 
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

router.get('/doc',(req,res) =>{
  res.render('docLanding')
});

router.get('/docSignup',(req,res) =>{
  res.render('docSignup')
});

router.get('/docdashboard', (req, res) => {
  if (req.isAuthenticated()) {
          res.render('docdashboard');
    } else {
      return res.status(401).redirect('');
  }
});



router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/protected-route');
});
module.exports = router;