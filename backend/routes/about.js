var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var formController = require('../controllers/formController');

//delete a user 
router.get('/delete', userController.get_delete_user);
router.post('/delete', userController.post_delete_user);
//figure out a way to verify to delete your account. 

// //update a user
router.get('/account/:id/update', userController.get_update_user);
router.post('/account/update', userController.post_update_user);

//view user information dashboard
router.get('/account/:id', userController.get_user_info); 

//create user item 
router.get('/create', userController.get_create_user); 
router.post('/create', userController.post_create_user);

//fill out the form 
router.get('/fill-form', formController.get_matching_form); 
router.post('/fill-form', formController.post_matching_form);

module.exports = router;
