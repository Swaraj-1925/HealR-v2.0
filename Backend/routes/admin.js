const express = require('express');
const router = express.Router();
 
const DocVerifyReq = require('./../controllers/admin').DocVerifyReqcontroller;
const AcceptReq = require('./../controllers/admin').AcceptReqcontroller;
const RejectReq = require('./../controllers/admin').RejectReqcontroller;
const status = require('./../controllers/admin').dashboard_statusController;
 
 



router.get("/docverication", DocVerifyReq );
router.put("/acceptReq", AcceptReq );
router.get("/dashboard", status );

module.exports = router;