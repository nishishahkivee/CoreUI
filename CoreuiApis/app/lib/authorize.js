const jwt = require("jsonwebtoken");
const config = require("../../config/default");
module.exports = (credentials = []) => { 
    return (req, res, next) => {
        if (typeof credentials === "string") {
            credentials = [credentials];
        }
        const token = req.headers["authorization"];
        if (!token) {          
            return res.status(401).send("Sorry pal: access denied");
        } else {         
            const tokenBody = token.slice(7);
            jwt.verify(tokenBody, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log(`Jwt error: ${err}`);
                    return res.status(401).send("Error:Acess Denied");
                }
                if (credentials.length > 0) {
                    if (
                        decoded.role &&
                        decoded.role.length &&
                        credentials.some(cred => decoded.role.indexOf(cred) >= 0)
                    ) {
                        next();
                    } else {
                        return res.status(401).send("Error:Acess Denied");
                    }
                } else {
                    next();
                }

            });
        }
    };

};