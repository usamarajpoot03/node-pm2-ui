const jwt = require("jsonwebtoken");
const config = require("../../configs/config");
const anonymousRoutes = require('../../helpers/anonymousRoutes');
const apiResponse = require("../../helpers/responseSender.helper");

verifyToken = (req, res, next) => {
    
    isAnonymous = anonymousRoutes.some(r => {
        return req.url.includes(r)
    })
    
    let token = req.headers["x-access-token"];
    
    if (isAnonymous){
        next();
    } else {

        if (!token) {
            return apiResponse.sendErrorResponse(res, 'No token Provided!', 403);
        }
        
        jwt.verify(token, config.secret, (err, decoded) => {
            console.log("decode", decoded);
            if (err) {
                return apiResponse.sendErrorResponse(res, 'Unauthorized!', 401);
            }
            req.username = decoded.user.username;
            req.roleId = decoded.user.roleId;
            req.userId = decoded.user.id;
            next();
        });
    }
};

module.exports = verifyToken;