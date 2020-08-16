const monsgoose  = require('mongoose');

// Schema for saving user data in DB

const userSchema = new monsgoose.Schema({
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

const User = monsgoose.model('user',userSchema);

module.exports = User;