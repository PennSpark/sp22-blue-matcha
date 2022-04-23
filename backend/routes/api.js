var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController');
var adminController = require('../controllers/adminController')
var galleryController = require('../controllers/galleryController')

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
router.get('/user/:id', apiController.get_user_by_link); 
router.get('/details', apiController.get_user_by_username); 

//get form 
router.post('/form_submit', apiController.post_form_response);
router.post('/addform', apiController.post_form);
router.get('/form/:form_number', apiController.get_form);

//coffee chat participating status 
router.post('/change_participating_status', apiController.change_chat_status); 
router.get('/all_users', apiController.get_all_users); 
router.get('/all_users_participating', apiController.get_all_users_with_participating)

//admin routes 
router.post('/generatematches', adminController.post_run_algorithm)
router.post('/push_matches', adminController.post_push_matchings)
router.get('/matchedwith', adminController.get_receive_matchings)
router.get('/allmatches',  adminController.get_all_pairings)
router.get('/pendingmatches', adminController.get_pending_pairing)
router.get('/pastmatches', adminController.get_past_matchings)
router.post('/updatepending', adminController.save_pending_pairing)

module.exports = router;