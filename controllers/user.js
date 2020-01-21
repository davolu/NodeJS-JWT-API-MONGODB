//import model 
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {errorHandler} = require('../helpers/dbErrorHandler');


exports.signup = (req, res) =>
{

    const newUser = new User(req.body);
  
    newUser.save( (err, user)=>{

          if(err)
          {

            return res.status(400).json({
              err : errorHandler(err)
            })
          }

          newUser.salt = undefined; 
          newUser.password_hashed  = undefined;
           
            return res.status(200).json({
                user
            });


          
    });

    
}


exports.signin = (req, res) =>{

  const {email, password} = req.body;
  User.findOne({email}, (err, user)=>{


    if(!err || user){
        return res.status(400).json({err:'User with the email provided doesnt exist. Sign Up!'});
    }

  });


}

//temp
/** 
 
MONGO_URI = mongodb+srv://ecommerce:1qaz2wsx3edc@cluster0-0zymk.mongodb.net/test?retryWrites=true&w=majority
PORT=5211
JWT_SECRET = DJDJDJDJD393JDJD
  
  

*/