const express = require('express');
const router = express.Router();

const DocSignup = require('./../controllers/doctor').Signupcontroller;

const auth = require('./../config/middleware');


router.post("/signup", DocSignup );

module.exports = router;