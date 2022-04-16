var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController');

//sign up for an account - return 200 if successful, 406 if not
router.post('/sign-up', apiController.post_sign_up);

//login: checks if logged in. returns userDetails + user if user accoutn created + logged in
router.get('/user', apiController.get_log_in);
router.get('/username', apiController.get_username);

//this is what is called when "login" is pressed
// --> post password stuff. returns status 200 if success + 400 if fail
router.post('/login', apiController.password_authenticate);
router.get('/login/success', apiController.success_login); 
router.get('/login/failure', apiController.failure_login); 

//log out button 
router.post('/logout', apiController.log_out); 

//create user 
router.post('/createaccount', apiController.post_create_user); 
router.post('/updateaccount', apiController.post_update_user); 
router.post('/deleteuser', apiController.post_delete_user); 

//if success (status 200) returns an object with user details. 
router.get('/user/details', apiController.get_user_info); 

//get form 
router.post('/addform', apiController.post_form);
router.get('/form', apiController.get_form);

module.exports = router;