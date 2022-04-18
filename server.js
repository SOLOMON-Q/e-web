if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);

const app = express();
app.use(express.json());



const storeItems = new Map([])







app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))
app.use(express.static('frontend'))




//Passport config
require('./config/passport')(passport);

//DB config
const db =require('./config/keys').mongoURI;

//Config to Mongo
mongoose.connect(db,{ useNewUrlParser:true})
.then(()=>console.log('MongoDB Connected ...'))
.catch(err=> console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


//Bodyparser
app.use(express.urlencoded({extended: false}));

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Passport middleware 
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    next();
});


//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
