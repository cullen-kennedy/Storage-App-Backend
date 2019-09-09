import User from '../database/models/user'
import jwt from 'jsonwebtoken';
import CONFIG from '../config/config'
import bcrypt from 'bcryptjs'


//Simple login /Authentication. To be refined

const UsersController = {
        async login(req, res) {

                let email = req.body.email;
                var pass = req.body.pass;
        
                if (email === "undefined" || pass == "undefined") {
                        res.send({
                                "code":400,
                                "failed":"error ocurred" 
                        })
                }
        
                const [status, response] = await User.getUser(email)
                        if (response.err){
                                res.send({
                                  "code":400,
                                  "failed":"error ocurred"
                                })
                        }else{
                                if(response.length > 0) {
                                        if(bcrypt.compareSync(pass, response[0][0].pass)) {
                                                var token = jwt.sign({ id: response[0][0].id }, CONFIG.jwt_encryption, {
                                                        expiresIn: 86400 // expires in 24 hours
                                                      });
                                                res.status(200).send({ auth: true, accessToken: token });
                                        }
                                        else{
                                                res.send({
                                                  "code":204,
                                                  "success":"Email and password does not match"
                                                    });
                                        }
                                } 
                                else {
                                        res.send({
                                                "code":204,
                                                "success":"Email does not exits"
                                                  });   
                                }
                        }
        },

        async signUp(req, res)  {
                // Save User to Database
                console.log("Processing func -> SignUp");
                
                await User.createUser({
                        name: req.body.name,
                        email: req.body.email,
                        pass: bcrypt.hashSync(req.body.pass, 8)
                })
        }
        
}

export default UsersController








