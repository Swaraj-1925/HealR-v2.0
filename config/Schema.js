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
    images:{
        imgS:String,
        imgB:String,
    },
    wokingdays:{
        weekdays:Boolean,
        everyday:Boolean
    },
    acceptedTime:[],
    available:{type:Boolean, default: true },
});


const appointmentSchema =new mongoose.Schema({
    doc_username:{type:String,unique:false},
    patient_username:{type:String,unique:false},
    Type_id:String,
    appointment_date: String,
    appointment_time: String,
    trasactionHash:String,
    time: {type: Date,default: Date.now}
});

const reviewSchema =new mongoose.Schema({
    doc_username:String,
    patient_username:String,
    review:{type:String,default:''},
    stars:{type:String,default:0}
});

const subscriptionSchema =new mongoose.Schema({

    username:String,
    planId:Number,
    start_date:Date,
    end_date:Date,
    trasactionHash:String

});

const authRequestSchema = new mongoose.Schema({
    username:String,
    name:String,
    verified:{type: Boolean,default:false},
    docLink:String,
    time: {type: Date,default: Date.now}

});

const usercredSchema  =new mongoose.Schema({

    username:String,
    name:String,
    role:String,
    hash:String,
    salt:String,

});

const authRequest = connection.model('authRequest',authRequestSchema)
const usercred = connection.model('usercred',usercredSchema)
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
        await usercred.createCollection();
        await authRequest.createCollection();
        console.log('Collections created successfully');
    } catch (err) {
        console.error('Error creating collections:', err);
    }
  };
  
  createCollections();
  
  module.exports = connection;