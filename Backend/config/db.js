const mongoose = require('mongoose');
require('dotenv').config();

// credentialSchema to store all the details about all type of credential
const Credential_Schema = new mongoose.Schema({

    username: { //store emaill
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {
        hash: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
    },
    type: {
        type: String,
        required: true,
        enum: ['admin', 'staff', 'patient', 'doctor'],
    },
    joiningDate: {
        type: Date,
        default: Date.now,
        required: true,
    }
});
// client schema for to store client inf

const User_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    patientUsername: { // Username of the patient
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    appointments: [{ // Array of appointments
        doctorUsername: { // Username of the doctor
            type: String,
            required: true,
        },
        appointmentType: {
            type: String,
            required: true,
            enum: ['call', 'videocall', 'message', 'irl'], // Allowed appointment types
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: Date, // Consider using Date object for time manipulation
            required: true,
        },
        default: [],
    }],
    reviews: [{ // Array of reviews
        doctorUsername: { // Username of the doctor
            type: String,
            required: true,
        },
        doctorId: { // Reference to a doctor document
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor', // Reference the Doctor model name
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        default: [],
    }],
    discord: {
        type: Boolean,
        required: true,
    },
});

// doctor schema
const Doctor_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure username is unique
    },
    verified: {
        type: Boolean,
        default: false // Default value is false
    },
    verifiedBy: {
        type: String,
        default: "" // Default value is an empty strin
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    shortdescription: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
    },
    acceptedTime: [{ // Array of accepted times (flexible)
        type: String,
        required: true,
    }],
    clinicLocation: {
        type: String,
    },
    experience: {
        years: {
            type: Number,
            required: true,
        },
        profession: {
            type: String,
            required: true,
        },
    },
    availability: { // Single value: "public" or "private"
        type: String,
        required: true,
        enum: ['public', 'private'],
    },
    image: {
        type: {
            big: {
                type: String, // URL or path to the large image
            },
            small: {
                type: String, // URL or path to the small image
            },
        },
        required: true,
    },
    document: {
        type: {
            experience: {
                type: String, // URL or path to the large image
            },
            profession: {
                type: String, // URL or path to the small image
            },
        },
        required: true,
    },
});


// staff schema
const Staff_Schema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true, // Ensure username is unique
    },
    name: {
        type: String,
        required: true,
    }, age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    identityProof: {
        type: String, // URL or path to the identity proof document
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    hiredBy: {
        type: String, // Username of the staff member who hired this staff (optional)
    },
});

//   admin schema
const Admin_Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    sharedAdminList: [{ // Array of ObjectIds referencing other admins
        type: String,
    }],
    sharedBy: { // ObjectId referencing the admin who shared access (optional)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
});


// Define database connection parameters (replace with your actual credentials)
const username = process.env.Username_Mongodb;
const password = process.env.Password_Mongodb;
const DB_name = process.env.Name_Database_Mongodb;

const connection = mongoose.createConnection(`mongodb+srv://${username}:${password}@cluster0.awcvfoh.mongodb.net/${DB_name}?retryWrites=true&w=majority`);

// Event listener for successful connection
connection.on('connected', () => console.log('Connected to MongoDB'));


const Credential = connection.model('Credential', Credential_Schema)
const User = connection.model('User', User_Schema)
const Doctor = connection.model('Doctor', Doctor_Schema);
const Staff = connection.model('Staff', Staff_Schema);
const Admin = connection.model('Admin', Admin_Schema);


const createCollections = async () => {
    try {
        await Credential.createCollection();
        await User.createCollection();
        await Doctor.createCollection();
        await Staff.createCollection();
        await Admin.createCollection();
        console.log('Collections created successfully');
    } catch (err) {
        console.error('Error creating collections:- \n', err);
    }
};
createCollections();
module.exports = connection;