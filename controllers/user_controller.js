const User =require('../models/user');
const { useDb } = require('../config/mongoose');
const bcrypt = require('bcryptjs');

module.exports.profile = (req,res)=>{
    return res.render('user_profile',{
        title:'user'
    })
};

module.exports.signin = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in',
    {
        title:'singnIn'
    });
};

module.exports.signup = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up',
    {
        title:'singnup'
    });
};

module.exports.create = (req,res)=>{
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }
    //Check if email Id already exist. If no create user
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log("Error while creating usr" + err);
            return;
        }
        // Create new user
        if(!user){
            // extracting password from request and encrypting
            let pass = req.body.password;
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    console.log('Error while generating salt in bcrypt usercontroller' + err);
                    return;
                }
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                  if (err) {
                      console.log('Error while generating hash in bcrypt usercontroller' + err);
                      return;
                  }
                  // putting back encrypted password in request
                  req.body.password = hash; 
                  User.create(req.body,(err,newuser)=>{
                    if(err){
                        console.log("Error in creating user" +err);
                        return;
                    }
                    return res.redirect('/user/sign-in');
    
                })
                });
              });           
        }
        else{
            // emailId already exists
            return res.redirect('back');
        }
    });
};

module.exports.createSession = (req,res)=>{
    req.flash('success','You are logged in');
    return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    req.logout();
    return res.redirect('/user/sign-in');
}

module.exports.passwordResetPage = (req,res)=>{
    //console.log('passsss'+req.params.id);
    return res.render('user_password_reset',{
        title:'password reset',
        id : req.params.id
    });
}

module.exports.changePassword = (req,res)=>{
    // get user details from DB
    User.findById(req.params.id,(err,found)=>{
        // compare old password provided with current password
        if(err){
            console.log('ALERT:::Id tempered');
            return res.redirect('back');
        }
        bcrypt.compare(req.body.old_password, found.password, function(err, resp) {
            if (err) return done(err);
            if (resp === false) {
                // passwordMismatch notif
                console.log('old password wrong');
              return res.redirect('back');
            } else {
                // if password matched check if pass and confirm pass match
                if(req.body.new_password !== req.body.new_password_check){
                    console.log('new password dont match');
                    return res.redirect('back'); 
                }
                // if new and old password same
                if(req.body.old_password === req.body.new_password){
                    console.log('old and new pass same!');
                    return res.redirect('back');
                }
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(req.body.new_password, salt);
                //check if old and new password hash same
                console.log('ready to reset');
                User.findByIdAndUpdate(req.params.id,{$set:{password:hash}},(err,updt)=>{
                    if(err){
                        console.log('error in passwordupdate');
                    }
                    console.log('password updated');
                });
                // show password success
              return res.redirect('back');
            }
          });
    });
}