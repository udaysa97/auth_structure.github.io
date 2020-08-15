const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth_bluePrint');
const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error in DB connect'));

db.once('open',()=>{
    console.log('conected to :: mongoose');
});

module.exports = db;