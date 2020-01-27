const express = require('express');
const router =express.Router();
const {userSignUpValidator} = require('../validator');


//users
const {signup, signin, signout, requireSignin} = require('../controllers/auth');
router.post('/signup', userSignUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/hello', requireSignin, (req,res)=>{
    res.send('hi');
});


module.exports=router;
