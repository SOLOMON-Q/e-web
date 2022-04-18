const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

//Welcome page
router.get('/',  (req, res) => res.render('welcome'));
//Dahsboard
router.get('/loggedin', ensureAuthenticated, (req, res) => 
res.render('loggedin',{
    name: req.user.name
    
}));





module.exports = router;
