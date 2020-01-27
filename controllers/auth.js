//import model 
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {errorHandler} = require('../helpers/dbErrorHandler');
require('dotenv').config();


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


exports.signin = (req, res) =>
{

  const {email, password} = req.body;
  User.findOne({email}, (err, user)=>{


    //check if email exist
    if(!user){
        return res.status(400).json({error:'User with the email provided doesnt exist. Sign Up!'});
    }


    //use authenticate method in model 

     if(!user.authenticate(password)){
        res.status(401).json({
          error:"Email and Password don't match"
        })
     }

   //generate token
   const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
   //add token to cookie with expiry date.

   res.cookie('t', token, {expire: new Date() + 9999});
    
   //response: 
    const  {_id, name, email, role} = user;
 
           return res.status(200).json({token, user: {_id, name, email, role} });

  });


}


exports.signout = (req, res) =>
{

  res.clearCookie('t');
  return res.status(200).json({
    message: "Signout successful"
  })

}


//Middlewares
//creating protected routes
exports.requireSignin =  expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});


exports.isAuth = (req,res, next)=>{

  let user = req.profile && req.auth && req.profile._id  == req.auth._id;
  
  if(!user){

      return res.status(403).json({

        error:"Access denied!"
      });
    
  }

  next();
}

exports.isAdmin = (req, res, next) =>{

  if(req.profile.role == 0){

        return res.status(403).json({

          error:"Admin resource! Access denied!"
        });


  }

}




 
















//temp
/** 
 
MONGO_URI = mongodb+srv://ecommerce:1qaz2wsx3edc@cluster0-0zymk.mongodb.net/test?retryWrites=true&w=majority
PORT=5211
JWT_SECRET = DJDJDJDJD393JDJD
  
  

*/