const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const user = require('../models/user');

// Creating strategy to authenticate user
passport.use(new localStrategy({
    usernameField:'email'
},(email,password,done)=>{
    user.findOne({email:email},(err,found)=>{
        if(err){
            console.log("Error while authemticating usre in passport" + err);
            return done(err);
        }
        if(!found || found.password != password){
            console.log("invalid username/pass");
            return done(null,false);
        }
        return done(null,found);
    });
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    user.findById(id,(err,User)=>{
        if(err){
            console.log("Error in deserializing user in passprt");
            return done(err);
        }
        return done(null,User);
    });
});

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in');
}

// this must be called in index.js to set identity
passport.setAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        // get signedin user from session cookie and set to locals
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;