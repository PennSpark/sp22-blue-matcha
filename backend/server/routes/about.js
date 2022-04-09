var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

//delete a user 
// router.get('/:id/delete', userController.get_delete_user);
// router.post('/:id/delete', userController.post_delete_user);

// //update a user
// router.get('/:id/update', userController.update_user);
// router.post('/:id/update', userController.update_user);

//view user information dashboard
router.get('/account/:id', userController.get_user_info); 

//create user item 
router.get('/create', userController.get_create_user); 
router.post('/create', userController.post_create_user);

module.exports = router;
