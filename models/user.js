const mongoose  = require('mongoose');

// Schema for saving user data in DB

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
    type:String,
    require:true
    }
},{
    timestamps:true
});

const User = mongoose.model('user',userSchema);

module.exports = User;