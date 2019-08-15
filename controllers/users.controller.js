const User = require('../database/models/users')
var jwt = require('jsonwebtoken');
const CONFIG = require('../config/config')


//Simple login /Authentication. Not yet used, but previously tested
//Authentication, registration etc. will come
const login = function(req, res) {

        let email = req.body.email;
        var password = req.body.password;

        if (email === "undefined" || password == "undefined") {
                res.send({
                        "code":400,
                        "failed":"error ocurred" 
                })
        }

        response = User.getUser(email)
                if (response.err){
                        res.send({
                          "code":400,
                          "failed":"error ocurred"
                        })
                }else{
                        console.log(response.results)
                        if(results.length > 0) {
                                if(results[0].password === password) {
                                        var token = jwt.sign({ id: results[0].id }, CONFIG.jwt_encryption, {
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
        }


module.exports.login = login





