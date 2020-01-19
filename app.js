const express = require('express');
const app = express();
const mongoose = require('mongoose');
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
  
//route
app.get('/', (req, res)=>{
    res.send('Hello from nodeJs');
});

//port
const port = process.env.PORT || 8000;

//start app
app.listen(port, ()=>{
   console.log(`Server is running on port ${port}`);
});

