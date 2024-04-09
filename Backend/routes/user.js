const express = require('express');
const router = express.Router();

const UserSignup  =require('./../controllers/user').Signupcontroller;
const UserSignin  =require('./../controllers/user').Signincontroller;
const UserDashboard  =require('./../controllers/user').Dashboardcontroller;

const auth  =require('./../config/middleware')



router.post("/signup", UserSignup);
router.post("/signin", UserSignin);
router.get("/dashboard",auth, UserDashboard);

module.exports = router;
  