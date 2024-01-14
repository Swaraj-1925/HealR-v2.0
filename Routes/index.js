const router = require('express').Router();
const passport = require('passport');
const genPassword = require('./../config/passwordUtils').genPassword;
const connection = require('./../config/Schema');

const User = connection.models.User;
const { BlobServiceClient } =require('@azure/storage-blob');
const intoStream = require('into-stream');
const fileUpload = require('express-fileupload');
const Doc = connection.models.Doc;
const authenticateDoc =connection.models.authenticateDoc;

router.post('/signin', (req, res, next) => {
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
  res.p
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
  } catch (error) {
      console.error(error);
      return res.status(500).send('Error creating user');
  }
  passport.authenticate("local")(req,res, function(){
    res.redirect("/dashboard")
  });
});


router.post('/doc', async (req,res) =>{
  // console.log(req)
  var imgname =req.files.doqment.name;
  var bloobName= `image-${Date.now()}.${imgname}`
  var dataStream= intoStream (req.files.doqment.data);
  const imageUrl = await uploadImageAuth(bloobName,dataStream)
  console.log(req.body)
  if(imageUrl){
    const newauthenticateDoc = new authenticateDoc({
      name:req.body.name,
      username:req.body.username,
      doqlink:imageUrl,
    });
    await newauthenticateDoc.save();
    res.send("<h1>user saved</h1>")
  }else{
    console.log("trying again!")
  }
});

router.post('/docSignup', async (req, res) => {
  
  console.log(req.files);
  try {
    const findUser = await authenticateDoc.findOne({ username: req.body.username });
    const checkForAuthentication = await authenticateDoc.findOne({ username: req.body.username, authorized: true });

    if (!findUser) {
      res.send("<h4>You haven't made a verification request yet. Please make a request or check your email. The email should be the same as you entered in the verification process.</h4>");
    } else {
      if (!checkForAuthentication) {
        res.send("<h4>Verification not done yet. Please try again later.</h4>");
      } else {
        try {
            var imgnameS = req.files.imagesS.name
            var imgnameB = req.files.imagesB.name
           
            var bloobnameS=`image-${Date.now()}.${imgnameS}`
            var bloobnameB=`image-${Date.now()}.${imgnameB}`

            var datastreamS= intoStream (req.files.imagesS.data);
            var datastreamB= intoStream (req.files.imagesB.data);

            const imageurlS =await uploadImage(bloobnameS,datastreamS)
            const imageurlB =await uploadImage(bloobnameB,datastreamB)
          
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
            acceptedTime: req.body.accepetedTime || [],
            available: req.body.available || true,
            images:{
              imgS:imageurlS,
              imgB:imgnameB
            },
            hash: hash,
            salt: salt
          });
          newdoc.save();
          res.send("<h1>User saved</h1>");
        }
        } catch (error) {
          console.error(error);
          res.status(500).send('<h4>Error saving user</h4>');
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('<h4>Error processing request</h4>');
  }
});


router.get('/dashboard', (req, res) => {
  const userData={
    name:req.user.name
  }
  
    if (req.isAuthenticated()) {
    return res.render('dashboard',{userData});
  } else {
    return res.redirect('/signin');
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
router.get('/doc', (req, res, next) => {
  res.render("docverifcation")
 });

router.get('/docSignup', (req, res, next) => {
  res.render("docsignUp")
 });


module.exports = router;