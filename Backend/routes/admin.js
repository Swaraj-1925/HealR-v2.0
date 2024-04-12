const express = require('express');
const router = express.Router();
 
const DocVerifyReq = require('./../controllers/admin').DocVerifyReqcontroller;
 
 



router.get("/docverication", DocVerifyReq );

module.exports = router;