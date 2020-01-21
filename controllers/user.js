//import model 
const User = require('../models/user');


exports.signup = (req, res) =>
{

    const newUser = new User(req.body);
    newUser.save( (err, user)=>{

          if(err)
          {

            return res.status(400).json({err})
          }else{

            return res.status(200).json({

                user

            });


          }
    });
}

//temp
/** 
MONGO_URI = mongodb+srv://ecommerce:9TLMm6sehBjJkGeL@cluster0-0zymk.mongodb.net/test?retryWrites=true&w=majority
PORT=5211
  

*/