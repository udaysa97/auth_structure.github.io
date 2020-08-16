const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');


router.get('/profile',userController.profile);

router.get('/sign-in',userController.signin );

router.get('/sign-up',userController.signup );

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-up'}),userController.createSession);


router.get('/sign-out',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

router.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:'/user/sign-in'
}),userController.createSession);

router.get('/reset-password/:id',userController.passwordResetPage);

router.post('/change-password/:id',userController.changePassword);



module.exports = router;