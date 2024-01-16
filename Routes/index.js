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
router.post('/signin', async (req, res, next) => {
 
  const existingUser = await usercred.findOne({ username: req.body.username,role:"patient"});
  if (!existingUser) {
    const alertMessage = "Email dose not exists please sign up";
    req.session.alert = alertMessage;
      return res.render('signup',{ accountExists: false });
  }
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
    
      return res.redirect('/dashboard');
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
        
          return res.render('signin',{ accountExists: true });
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
router.post('/docSignin',async (req,res)=>{
  
  const existingUser = await usercred.findOne({ username: req.body.username,role:"doctor" });
  if (!existingUser) {
    const alertMessage = "Email dose not exists please sign up";
    req.session.alert = alertMessage;
      return res.render('signup',{ accountExists: false });
  }
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
    
      return res.redirect('/docdashboard');
    });
  })(req, res);

})
router.post('/doc', async (req,res) =>{
  const existingUser = await authRequest.findOne({ username: req.body.username });
      if (existingUser) {
        
        return res.render('doc',{ verification: false })
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
  return res.render('doc',{ requestsucsefuly: true })
  }catch(err){
    return res.render('doc',{ requestsucsefuly: false })
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
      return res.render('doc',{ verificationExist: false })

    } else {
      if (!checkForAuthentication) {
        return res.render('doc',{ verification: false });
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
        return res.render('doc',{ userExist: true });
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
          console.log(appointments)
          const bookedTimeSlots = appointments.map(appointment => {
            const hours = appointment.appointment_time;
            console.log(hours)
            return hours;
          });

          const freeTimeSlots = acceptedTimes.filter(timeSlot => !bookedTimeSlots.includes(timeSlot));
          console.log(freeTimeSlots)
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

router.post('/payment', async(req,res) =>{
  
  const key = Object.keys( req.body);
  if(!req.user){
    return res.redirect('/signup')
  }
  const doc = await Doc.findById(req.session.userData.doctor)
  // const appointmentData ={
  //   doc_username:doc.username,
  //   patient_username:req.user.username,
  //   Type_id:key,
  //   appointment_date: req.session.userData.date,
  //   appointment_time: req.session.userData.time,
  // }
  try{
    const newappoinment = new Appointment({
      doc_username:doc.username,
      patient_username:req.user.username,
      Type_id:key[0],
      appointment_date: req.session.userData.date,
      appointment_time: req.session.userData.time,
    })
    await newappoinment.save();
    console.log('appoinment saved')
    console.log("befor",req.session)
    if (req.session && req.session.userData) {
      // Remove the userData from the session
      delete req.session.userData;
      console.log('Removed userData from the session.');
    } else {
      console.log('userData not found in the session.');
    }
    console.log("after",req.session)

  }catch(err){
    console.log(err)

  }
  

});
// =================get routes===========================
router.get('/', (req, res, next) => {
 res.render("landing")
});
router.get('/signup', (req, res, next) => {
  const  session =req.session
  if(session){
  res.render("signup",{session})
}else{
  res.render("signup",{session})
}
 });
 
router.get('/signin', (req, res, next) => {
  
  res.render("signin")
 });
 // ==============doc===============
router.get('/dashboard', async (req, res) => {
  if (req.isAuthenticated()) {
   const check=  await usercred.find({ username: req.user.username ,role:"patient" })
   
    if(check.length === 0){
      return res.redirect('/signin')
    }
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
    return res.render('signin',{ loggedin: false });
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

router.get('/docdashboard', async(req, res) => {
  
  if (req.isAuthenticated()) {
    const check=  await usercred.find({ username: req.user.username ,role:"doctor" })
    if(check.length === 0){
      return res.redirect('/signin')
    }
          res.render('docdashboard');
    } else {
      return res.status(401).redirect('/docSignin');
  }
});
router.get('/docSignin',(req,res) =>{
  res.render('docSignin')
});

router.get('/doc_Description', async (req, res) => {
  if (req.isAuthenticated()) {
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
} else {
  return res.render('signin',{ loggedin: false });
}
});

router.get('/Schedule', (req, res) => {
  if (req.isAuthenticated()) {
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
} else {
  return res.render('signin',{ loggedin: false });
}
});

router.get('/typetherapy',(req,res) =>{
  if (req.isAuthenticated()) {
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
} else {
  return res.render('signin',{ loggedin: false });
}

});


router.get('/settings', (req, res, next) => {
  if (req.isAuthenticated()) {
  res.render('settings');
} else {
  
  return res.render('signin',{ loggedin: false });
}
});
router.get('/review', async (req, res) => {
  let appoinmentstatus;
  try {
    if (req.isAuthenticated()) {
      const doc = await Doc.findById(req.query.id);
      const appoinmentDone = await Appointment.findOne({ patient_username: req.user.username, doc_username: doc.username });
      const reviews = await Review.find({ doc_username: doc.username });
      if (appoinmentDone) {
        appoinmentstatus = true;
        res.render('review', { appoinmentstatus, reviews });
      } else {
        appoinmentstatus = false;
        res.render('review', { appoinmentstatus, reviews });
      }
    } else {
      return res.render('signin', { loggedin: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/docSignIn',(req,res)=>{

  res.render('docSignIn')
})
router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/signin');
  });
});

module.exports = router;