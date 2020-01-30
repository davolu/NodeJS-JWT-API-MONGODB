//import model 
const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');

 
 
//this will create a new category
exports.create = (req,res)=>
{

    const category = new Category(req.body);
          
    category.save( (err,data)=>{

          if(err){
              return res.status(403).json({
                  error: errorHandler(err)
              })
          }

          res.json({data});


    });
}












 