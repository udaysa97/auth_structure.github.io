const User =require('../models/user');
const { useDb } = require('../config/mongoose');

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
    //Check if email Id already exist. If no create user
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log("Error while creating usr" + err);
            return;
        }
        // Create new user
        if(!user){
            User.create(req.body,(err,newuser)=>{
                if(err){
                    console.log("Error in creating user" +err);
                    return;
                }
                return res.redirect('/user/sign-in');

            })
        }
        else{
            return res.redirect('back');
        }
    });
};

module.exports.createSession = (req,res)=>{
    return res.redirect('/');
}