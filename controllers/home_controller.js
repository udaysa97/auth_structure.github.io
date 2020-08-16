module.exports.home = (req,res)=>{
    if(req.isAuthenticated()){
        req.flash('success','You are logged in');
        return res.redirect('/user/profile');
    }
    return res.render('home',{
        title:"hello"
    });
}