const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy.js');

app.use(express.urlencoded());
//to make app use cookieParser
app.use(cookieParser());

// to set up views and point all views to views folder
app.set('view engine','ejs');
app.set('views','./views');

// TO extract script and styles inside views from assets
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));


//to have a common code in layouts.ejs
app.use(expressLayouts);

app.use(session({
    name:'auth_struc',
    secret:'randomEncrypt',  
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.setAuthenticatedUser);

// redirect all routes to index.js in routes folder
app.use('/',require('./routes'));
app.listen(port,(err)=>{
    if(err){
        console.log(`Error while hosting: ${err}`);
    }
    console.log(`Server running on port: ${port}`);
});