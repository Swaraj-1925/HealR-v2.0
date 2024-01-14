const mongoose = require('mongoose');
require('dotenv').config();

const username =process.env.usernameMonog;
const password=process.env.passwordMonog;

const connection = mongoose.createConnection(`mongodb+srv://${username}:${password}@cluster0.awcvfoh.mongodb.net/Healr?retryWrites=true&w=majority`);

const UserSchema = new mongoose.Schema({
    username: {type:String,unique:true},
    name:{type:String,unique:false},
    age:Number,
    Profession:String,
    appointmentStatus:{type:Boolean, default:false },
    role: { type: String, default: 'user' },
    hash: String,
    salt: String,
});


const docSchema = new mongoose.Schema({
    username: {type:String,unique:true},
    name:{type:String,unique:false},
    yearOfExprience:Number,
    Profession:String,
    about: String,
    fees :{
        call:Number,
        videoCall:Number,
        message:Number,
        inRealLife:Number,
    },
    wokingdays:{
        weekdays:{type:Boolean,default:true},
        everyday:{type:Boolean,default:false}
    },
    accepetedTime:[Number],


    images:{
        imgS:String,
        imgB:String,
    },
    available:{type:Boolean, default: true },
    role: { type: String, default: 'doctor' },
    hash:String,
    salt:String
});


const appointmentSchema =new mongoose.Schema({
    doc_username:String,
    patient_username:String,
    Type_id:Number,
    appointment_date: Date,
    appointment_time: Date,
    trasactionHash:String

});

const reviewSchema =new mongoose.Schema({
    doc_username:String,
    patient_username:String,
    review:String,
    stars:Number
});

const subscriptionSchema =new mongoose.Schema({

    username:String,
    planId:Number,
    start_date:Date,
    end_date:Date,
    trasactionHash:String

});
const Doc =connection.model('Doc',docSchema);
const Appointment = connection.model('Appointment',appointmentSchema);
const Review = connection.model('Review',reviewSchema);
const Subscription = connection.model('Subscription',subscriptionSchema);
const User = connection.model('User', UserSchema);

const createCollections = async () => {
    try {
        await Doc.createCollection();
        await Appointment.createCollection();
        await Review.createCollection();
        await Subscription.createCollection();
        await User.createCollection();
        await authenticateDoc.createCollection();
        console.log('Collections created successfully');
    } catch (err) {
        console.error('Error creating collections:', err);
    }
  };
  
  createCollections();
  
  module.exports = connection;