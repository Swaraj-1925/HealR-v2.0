const connection = require('../../config/db');
const User = connection.models.User;
const Credential = connection.models.Credential;

async function UpdateUser(userData, res) {
    console.log(userData);
    try {
        const {username ,tochange, userdata } = userData; 
        const update = { $set: { [tochange]: userdata } }; 

        console.log(tochange);
        const updatedUser = await User.findOneAndUpdate(
            { patientUsername: userData.username },
            update,
            { new: true } 
        );
        if(tochange=="patientUsername"){
            const updatedCredential = await Credential.findOneAndUpdate(
                { username: userData.username,type:"patient" },
                {username:userdata},
                { new: true } 
            );
        }

        if (updatedUser) {

            res.json({ message: 'successfully', user: updatedUser });
        } else {
            res.status(400).json({ message: 'User update failed' }); // Specific error
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = UpdateUser