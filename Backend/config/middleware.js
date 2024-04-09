const secretKey = process.env.Secret;
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
        // console.log(req)
    try {
        const { token } = req.cookies
        if (!token) {
            
            throw new Error('Not authenticated');
           
        } else {
            const decode = jwt.verify(token, secretKey)
            req.user = decode;
            req.authenticated = true;
            return next();
        }
    } catch (error) {

        const e = error.message;
        console.log(e);
        res.status(401).json({ message: "Invalid", error: e });
    }

}

module.exports = auth