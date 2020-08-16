const passport = require('passport');
const googleStategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

passport.use(new googleStategy({
    clientID:'red', // replace with your client ID
    clientSecret:'red', // replace with your client secret
    callbackURL:'http://localhost:8000/user/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    // check if user already registered with us
    User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
        if(err){
            console.log("Error while finding user after googleauth" + err);
            return;
        }
        if(user){
            // user already registred with us
            return done(null,user);
        }else{
            //creating random password and encrypting using bcrypt
            let randomPass = crypto.randomBytes(20).toString('hex');
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(randomPass, salt);
            // create user using data received from google
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:hash
            },(err,createdUser)=>{
                if(err){
                    console.log("Error while creating user after google auth"+err);
                    return;
                }
                // return created user
                return done(null,createdUser);
            })
        }
    })
}));

module.exports = passport;