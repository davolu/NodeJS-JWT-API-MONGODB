const express = require('express');
const router =express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const {create} = require('../controllers/category');

router.post('/category/create', requireSignin, isAuth, isAdmin, create);

module.exports=router;
