const connection = require('./../../config/db');
const User = connection.models.User;
const Doctor = connection.models.Doctor;

async function Bookappoinmetpage(req, res) {

  try {
    const verifiedDoctors = await Doctor.find();
    res.json(verifiedDoctors); // Send the doctor data as JSON response
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}

async function Docdescription(req, res) {
  const docDescription = await Doctor.find({ _id: req.params.doctorId }).select('username name description fees clinicLocation experience image');
  const Doc = docDescription[0]; 
  console.log(Doc )
  const appointments = await User.find({ doctorUsername: Doc.username});
    const docData = {
      name: Doc.name,
      description: Doc.description,
      clinicLocation: Doc.clinicLocation,
      feesM: Doc.fees.message,
      feesc: Doc.fees.call,
      feesvc: Doc.fees.videoCall,
      feesCli: Doc.fees.inClinic,
      imageB: Doc.image.big,
      YearOfexperience: Doc.experience.years,
      profession: Doc.experience.profession,
    };


    res.status(200).json({ docData })
  }

async function Docappoinmentdata(req, res) {
  
  res.status(200)
  }


async function Scheduleappointment(req, res) {
  const docDescription = await Doctor.find({ _id: req.params.doctorId }).select('username');
  res.status(200)
  }


module.exports =
{
  Bookappoinmetpage,
  Docdescription,
  Docappoinmentdata,
  Scheduleappointment
}