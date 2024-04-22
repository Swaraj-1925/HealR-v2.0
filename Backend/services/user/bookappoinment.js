const connection = require('./../../config/db');
const User = connection.models.User;
const Doctor = connection.models.Doctor;
const Verification = connection.models.Verification;

async function Bookappoinmetpage(req, res) {

  try {
    const verifiedDoctors = await Doctor.find();
    const Verification = await Verification.find();
    res.json(verifiedDoctors); 
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}

async function Docdescription(req, res) {
  const docDescription = await Doctor.find({ _id: req.params.doctorId }).select('username name description fees clinicLocation experience image');
  const Doc = docDescription[0];
  const appointments = await User.find({ doctorUsername: Doc.username });
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
  const selectedDate = new Date(req.query.selectedDate);

    // Increment the selectedDate by 1 day
    selectedDate.setDate(selectedDate.getDate() + 1);

    const isoDate = selectedDate.toISOString().split('T')[0];;
    console.log(isoDate);

  const docDescription = await Doctor.findOne({ _id: req.params.doctorId }).select('acceptedTime username');
  const acceptedTimes = JSON.parse(docDescription.acceptedTime)
  const checkAppointments = await User.find(
    { 'appointments.doctorUsername': docDescription.username },
    { 'appointments.date': 1, 'appointments.time': 1, _id: 0 }
  );


  const appointmentsData = [];
  checkAppointments.forEach(user => {
    user.appointments.forEach(appointment => {

      const date = appointment.date;
      const time = appointment.time;
      if (date == isoDate) {
        appointmentsData.push({ date, time });
      }

    });
  });
  console.log(appointmentsData)

  const bookedTimes = [];
  checkAppointments.forEach(user => {
    user.appointments.forEach(appointment => {
      const date = appointment.date;
      if (date == isoDate) {
        bookedTimes.push(appointment.time);
      }
    });
  });
  const availableTimes = acceptedTimes.filter(time => !bookedTimes.includes(time));
  console.log(bookedTimes);
  console.log(availableTimes);
  const acceptedTime = docDescription.acceptedTime[0]
  res.status(200).json({ time: availableTimes })
}




async function Scheduleappointment(req, res) {
  try {
    const docDescription = await Doctor.findById(req.params.doctorId).select('username');
    const selectedDate = new Date(req.body.date);
    selectedDate.setDate(selectedDate.getDate() + 1);
    const isoDate = selectedDate.toISOString().split('T')[0];;
    const doctorUsername = docDescription.username;

    await User.findOneAndUpdate(
      { patientUsername: req.user },  
      {
        $addToSet: {
          appointments: {
            doctorUsername: doctorUsername, 
            appointmentType: req.body.selectedMethod,
            date: isoDate,
            time: req.body.selectedTimeSlot,
          }
        }
      },
      { new: true }
    );

    res.status(200).json({ message: "successfull" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports =
{
  Bookappoinmetpage,
  Docdescription,
  Docappoinmentdata,
  Scheduleappointment
}