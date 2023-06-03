const jsonwebtoken = require('jsonwebtoken');
const secretKey = "th3Devel0p3r";

const jwtAuthorization = {
    signToken(payload){
        const token = jsonwebtoken.sign(payload, secretKey);
        return token;
    },

    verifyToken(req, res, next){
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({message: "No Token Provided"});
        }

        try {
            const decoded = jsonwebtoken.verify(token, secretKey);
            req.userId = decoded.userId;
            next();
        }catch(error){
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}

module.exports = jwtAuthorization;