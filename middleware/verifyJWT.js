import jwt from 'jsonwebtoken'
import CONFIG from '../config/config'

const authJwt = {
	verifyToken(req, res, next) {
		const header = req.headers['authorization'];

		if(header) {
				const bearer = header.split(' ');
				const token = bearer[1];
		
			if (!token){
				return res.status(401).send({ 
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
		else {
			return res.status(401).send({ 
				auth: false, message: 'No authorization provided.' 
			});
		}
	}
}


export default authJwt

