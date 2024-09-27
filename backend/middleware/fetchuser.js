const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Rohanhassignedthetokenwiththissecret'

const fetchuser = (req, res, next)=>{
    // Get user from the jwt token add id to the req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error: 'Please authenticate using a valid token'})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error: 'Please authenticate using a valid token'})
    }
}

module.exports = fetchuser;