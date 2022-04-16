const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

//Welcome page
router.get('/',  (req, res) => res.render('welcome'));
//Dahsboard
router.get('./index.html', ensureAuthenticated, (req, res) => 
res.render('index.html',{
    name: req.user.name
}));





module.exports = router;