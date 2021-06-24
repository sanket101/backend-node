const jwt = require('jsonwebtoken');
const ResponseHandler = require('../utils/response');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        throw ResponseHandler.getErrorResponseObject('Not Authenticated!', 401);
    }

    const token = req.get('Authorization').split(' ')[1];

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secretkeyforregisteringtokeninauniquewaythatnoonecouldthinkof');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken){
        throw ResponseHandler.getErrorResponseObject('Not Authenticated!', 401);
    }

    req.userId = decodedToken.userId;

    next();
};