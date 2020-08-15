const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


// to set up views and point all views to views folder
app.set('view engine','ejs');
app.set('views','./views');

// TO extract script and styles inside views from assets
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));


//to have a common code in layouts.ejs
app.use(expressLayouts);

// redirect all routes to index.js in routes folder
app.use('/',require('./routes/index'));
app.listen(port,(err)=>{
    if(err){
        console.log(`Error while hosting: ${err}`);
    }
    console.log(`Server running on port: ${port}`);
});