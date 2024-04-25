const connection = require('./../../config/db');
const User = connection.models.User;
const Doctor = connection.models.Doctor;
const Report = connection.models.Report;
async function Bookappoinmetpage(req, res) {
  try {

    const verifiedDoctors = await Doctor.find();

    const doctorData = [];

    // Iterate over each doctor to aggregate additional information
    for (const doctor of verifiedDoctors) {
      // Count the number of reviews for this doctor
      const reviewCount = await User.countDocuments({ 'reviews.doctorUsername': doctor.username });

      // Calculate the total number of reviews
      let totalReviews = 0;

      // Calculate the average rating for this doctor
      const reviews = await User.aggregate([
        { $match: { 'reviews.doctorUsername': doctor.username } },
        { $unwind: '$reviews' },
        { $match: { 'reviews.doctorUsername': doctor.username } },
        { $group: { _id: null, avgRating: { $avg: '$reviews.stars' }, totalReviews: { $sum: 1 } } }
      ]);

      if (reviews.length > 0) {
        totalReviews = reviews[0].totalReviews;
      }

      // Calculate the average rating for this doctor
      const averageRating = reviews.length > 0 ? parseFloat(reviews[0].avgRating.toFixed(1)) : 0;

      // Construct doctor data object
      const doctorInfo = {
        doc_id: doctor._id,
        name: doctor.name,
        profession: doctor.experience.profession,
        keyPoints: JSON.parse(doctor.shortdescription[0]),
        fees: doctor.fees.message,
        smallImage: doctor.image.small,
        reviewCount: totalReviews,
        averageRating: averageRating
      };

      doctorData.push(doctorInfo);
    }

    res.status(200).json({ doctorData });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function Docdescription(req, res) {
   
  const docDescription = await Doctor.find({ _id: req.params.doctorId }).select('username name description fees clinicLocation experience image');
  const Doc = docDescription[0];
  const appointments = await User.find({ 'appointments.doctorUsername': Doc.username });

  const reviews = await User.find({ 'reviews.doctorUsername': Doc.username }).select('patientUsername reviews');
  let reviewData = []; // Array to store review data for all users
  let totalStars = 0;
  let reviewCount = 0;

  reviews.forEach(review => {
    review.reviews.forEach(userReview => {
      // Push star, username, and review into the array
      reviewData.push({
        stars: userReview.stars,
        username: review.patientUsername,
        review: userReview.review
      });

      // Calculate total stars
      totalStars += userReview.stars;
      reviewCount++;
    });
  });

  const averageRating = reviewCount > 0 ? (totalStars / reviewCount).toFixed(1) : null;

  const appointmentCount = appointments.length > 0 ? appointments.length : null;

  const docData = {
    name: Doc.name,
    description: Doc.description,
    clinicLocation: Doc.clinicLocation,
    feesM: Doc.fees.message,
    feesc: Doc.fees.call,
    feesvc: Doc.fees.videoCall,
    appointment: appointmentCount,
    reviews: reviewData,
    reviewCount: reviewCount,
    averageRating: averageRating,
    feesCli: Doc.fees.inClinic,
    imageB: Doc.image.big,
    YearOfexperience: Doc.experience.years,
    profession: Doc.experience.profession,
  };
  res.status(200).json({ docData });
}



async function Docappoinmentdata(req, res) {
  const selectedDate = new Date(req.query.selectedDate);

  // Increment the selectedDate by 1 day
  selectedDate.setDate(selectedDate.getDate() + 1);

  const isoDate = selectedDate.toISOString().split('T')[0];;
  

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


async function RateDoctor(userData, res) {
  try {
    const docDescription = await Doctor.findById(userData.data.doctorId).select('username');

    // Define the filter to find the existing user document
    const filter = { patientUsername: userData.user };

    // Define the update to push the new review data to the reviews array
    const update = {
      $push: {
        reviews: {
          doctorUsername: docDescription.username, // Assuming `docDescription` contains the doctor's username
          review: userData.data.review,
          stars: userData.data.rating,
        }
      }
    };

    // Options for the findOneAndUpdate method (to return the updated document)
    const options = { new: true };

    // Find and update the existing user document
    User.findOneAndUpdate(filter, update, options)
      .then(updatedUser => {
        if (!updatedUser) {
          throw new Error('User not found');
        }
 
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });


    res.status(200).json({ message: "successfull" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function ReportDoctor(userData, res) {
  try {
    
    const doctorUsername = userData.data.doctorId;
    const dusername = await Doctor.findOne({ _id: doctorUsername }); 
    const reportData = {
      pusername: userData.user,
      dusername: dusername.username,
      report: userData.data.reason,
    };

    const report = new Report(reportData);
    await report.save();

    res.status(200).json({ message: 'successfull' });
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
  Scheduleappointment,
  RateDoctor,
  ReportDoctor
}