const connection = require('./../../config/db');
const User = connection.models.User;
const Doctor = connection.models.Doctor;

async function Bookappoinmet(req,res){

    try {
       const verifiedDoctors = await Doctor.find({ verified: true });// Fetch all doctors from the database
        res.json(verifiedDoctors); // Send the doctor data as JSON response
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }    
}

async function Docdescription(req,res){
  const docDescription = await Doctor.find({ _id: req.body.doctorId });
  
  res.status(200)

}
module.exports= 
{Bookappoinmet,
Docdescription
}