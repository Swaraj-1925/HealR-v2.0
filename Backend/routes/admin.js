const express = require('express');
const router = express.Router();
 
const DocVerifyReq = require('./../controllers/admin').DocVerifyReqcontroller;
const AcceptReq = require('./../controllers/admin').AcceptReqcontroller;
const RejectReq = require('./../controllers/admin').RejectReqcontroller;
const status = require('./../controllers/admin').dashboard_statusController;
const Patient_list = require('./../controllers/admin').Patient_listController;
const Doctor_list = require('./../controllers/admin').Doctor_listController;
 
 



router.get("/docverication", DocVerifyReq );
router.put("/acceptReq", AcceptReq );
router.put("/rejectReq", RejectReq );
router.get("/dashboard", status );
router.get("/Patient_list", Patient_list );
router.get("/Doctor_list", Doctor_list );

module.exports = router;