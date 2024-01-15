const router = require('express').Router();
const passport = require('passport');
const genPassword = require('./../config/passwordUtils').genPassword;
const connection = require('./../config/Schema');
const usercred = connection.models.usercred;
const Doc = connection.models.Doc;
const User = connection.models.User;
const Appointment = connection.models.Appointment;
const Review = connection.models.Review;
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
        name: req.body.name,
        role: "patient",
        hash: hash,
        salt: salt
      })

      await newUser.save();
      await newUsercred.save();
      

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

  const acceptedTime = req.body.acceptedTime || [];
  var workingdays;
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
            Profession: req.body.Profession,
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

router.post('/Schedule',(req,res) =>{
  const id = req.query.id;
  const selectedDate = req.body.selectedDate;
  Doc.findById(id)
  .then(doc => {
    if (doc) {
      const usernameToFind = doc.username;
      const acceptedTimes = doc.acceptedTime|| []; 

      Appointment.find({ doc_username: usernameToFind, appointment_date: selectedDate })
        .then(appointments => {
          const bookedTimeSlots = appointments.map(appointment => {
            const hours = appointment.appointment_time.getHours();
            return hours;
          });

          const freeTimeSlots = acceptedTimes.filter(timeSlot => !bookedTimeSlots.includes(timeSlot));
          const data={
            id:id,
            freeTimeSlots:freeTimeSlots,
            selectedDate:selectedDate
          }
          res.render('Schedule', { data });
          console.log("Free time slots for the doctor on", usernameToFind, ":", freeTimeSlots);
        })
        .catch(err => {
          console.error("Error retrieving appointments:", err);
        });
    } else {
      console.log("Doctor not found");
    }
  })
  .catch(err => {
    console.error("Error finding doctor:", err);
  })
 
});


router.post('/typetherapy',(req,res) =>{

  console.log(req.body)
  });
router.post('/sessionstore',(req,res) =>{
  const docId = req.query.id;
 
  req.session.userData = {
    date: req.body.selectedDate,
    doctor: docId,
    time: req.body.selectedTime
  };

  res.redirect('/typetherapy');
})
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
 // ==============doc===============
router.get('/dashboard', async (req, res) => {
  if (req.isAuthenticated()) {
      if (req.user) { 
        const userData = {
          name: req.user.name,
          appointmentStatus: req.user.appointmentStatus
      };
        Doc.find({}, 'name yearOfExperience Profession fees.call images.imgS _id')
        
          .then(docs => {
            
            Review.aggregate([
              { $group: { _id: '$doc_username', count: { $sum: 1 }, avgStars: { $avg: '$stars' } } }
            ])
            .then(reviews => {
              res.render('dashboard', { userData,docs, reviews });
            })
            .catch(error => {
              console.error(error);
            });
          })
          .catch(error => {
            console.error(error);
          });
         
    
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
router.get('/docSignin',(req,res) =>{
  res.render('docSignin')
});

router.get('/docdashboard', (req, res) => {
  if (req.isAuthenticated()) {
          res.render('docdashboard');
    } else {
      return res.status(401).redirect('/docSignin');
  }
});
router.get('/docSignin',(req,res) =>{
  res.render('docSignin')
});
router.get('/doc_Description', async (req, res) => {
  try {
    const docId = req.query.id;
   
    const [doc, appointmentCount, reviewCount, avgRating] = await Promise.all([
      Doc.findById(docId),
      Appointment.countDocuments({ doc_username: docId }),
      Review.countDocuments({ doc_username: docId }),
      Review.aggregate([
        { $match: { doc_username: docId } },
        { $group: { _id: null, avgStars: { $avg: '$stars' } } }
      ]).then(result => result[0]?.avgStars)
    ]);

    if (!doc) {
      return res.status(404).send('Doctor not found');
    }

    res.render('docdescription', {
      doc: {
        name: doc.name,
        Profession: doc.Profession,
        about: doc.about,
        patients: appointmentCount,
        reviews: reviewCount|| 0,
        rating: avgRating || 0,
        image: doc.images.imgB,
        experience:doc.yearOfExperience ||1,
        docId:req.query.id,
        
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching doctor details');
  }
});

router.get('/Schedule', (req, res) => {
  const id = req.query.id;
  const selectedDate = req.body.selectedDate;
  Doc.findById(id)
  .then(doc => {
    if (doc) {
      const usernameToFind = doc.username;
      const acceptedTimes = doc.acceptedTime|| []; 

      Appointment.find({ doc_username: usernameToFind, appointment_date: selectedDate })
        .then(appointments => {
          const bookedTimeSlots = appointments.map(appointment => {
            const hours = appointment.appointment_time.getHours();
            return hours;
          });

          const freeTimeSlots = acceptedTimes.filter(timeSlot => !bookedTimeSlots.includes(timeSlot));
          const data={
            id:id,
            freeTimeSlots:freeTimeSlots,
            selectedDate:''
          }
          res.render('Schedule', { data });
          console.log("Free time slots for the doctor on", usernameToFind, ":", freeTimeSlots);
        })
        .catch(err => {
          console.error("Error retrieving appointments:", err);
        });
    } else {
      console.log("Doctor not found");
    }
  })
  .catch(err => {
    console.error("Error finding doctor:", err);
  })
});

router.get('/typetherapy',(req,res) =>{

  const userData =req.session.userData;
  const doqId = userData.doctor;
  Doc.findById(doqId)
  .then(doc => {
    if (doc) {
  
      const fees = doc.fees|| [];
      
      res.render('typetherapy',{fees})

      console.log(fees)
    } else {
      console.log("Doctor not found");
    }
  })
  .catch(err => {
    console.error("Error finding doctor:", err);
  })

});


router.get('/settings', (req, res, next) => {
  res.render('settings');
});
router.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/signup');
  });
});
module.exports = router;