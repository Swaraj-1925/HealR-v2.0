
const DocVerifyReq = require('./../services/admin/doc_verification_req');


async function DocVerifyReqcontroller(req, res) {

    try {
        const userData = req.body;
        const user = await DocVerifyReq(userData,res);

        // res.status(201).json({ message: "Successfully" });



    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    DocVerifyReqcontroller,
    //  Verifycontroller,
    // Dashboardcontroller,
    // Bookappoinmet_Controller,
    // Doc_description_Controller
};