var jwt = require('jsonwebtoken');
const CONFIG = require('../config/config')

verifyToken = (req, res, next) => {
	const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, CONFIG.jwt_encryption, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		
		req.UserId = decoded.id;
		next();
	});
}


}
const authJwt = {};
authJwt.verifyToken = verifyToken;
module.exports = authJwt