const jwt = require("jsonwebtoken");
const fs = require('fs')

var isAuthorized = function(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            if (err) {  
                res.status(401).json({ error: "Not Authorized" });
            } else {
				return next();
			}
        });
    } else {
        res.status(401).json({ error: "No Authorization Header" });
    }
}

module.exports = {
	isAuthorized: isAuthorized,
}