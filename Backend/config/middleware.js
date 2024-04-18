const jwt = require('jsonwebtoken');
const connection = require('./db');
const Credential = connection.models.Credential;

const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error('Not authenticated');
        } else {
            const decoded = jwt.verify(token, process.env.Secret);
            const user = await Credential.findOne({ _id: decoded.userId }).exec();
            
            if (user) {
                req.user = user.username;
                return next();
            } else {
                throw new Error('User not found');
            }
        }
    } catch (error) {
        console.error('Authentication failed:', error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;
