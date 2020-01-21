const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')
const users = require('./routes/user');
require('dotenv').config();
    
//connect to mongo db
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true, useCreateIndex:true}
  )
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

  
  
  //middlewares
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(expressValidator());
 
 
  //routes middleware
  app.use('/api',users);
 
 
   
 

//port
const port = process.env.PORT || 8000;

//start app
app.listen(port, ()=>{
   console.log(`Server is running on port ${port}`);
});

