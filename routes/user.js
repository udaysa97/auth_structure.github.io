const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');


router.get('/profile',userController.profile);

router.get('/sign-in',userController.signin );

router.get('/sign-up',userController.signup );

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-up'}),userController.createSession);



module.exports = router;