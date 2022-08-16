const express = require('express')
const router = express.Router()

//import controllers
const apiController = require('../controllers/apiController')
const adminController = require('../controllers/admin/adminController')
const galleryController = require('../controllers/galleryController')
const loginController = require('../controllers/loginController')
const userController = require('../controllers/userController')

//login-controller
router.get('/login/success', loginController.success_login)
router.get('/login/failure', loginController.failure_login)
router.get('/user', loginController.confirm_logged_in, loginController.get_log_in)

router.post('/login', loginController.password_authenticate)
router.post('/sign-up', loginController.post_sign_up)
router.post('/logout', loginController.log_out)

//user-controller/
router.get('/username', loginController.confirm_logged_in, userController.get_username)
router.get('/user/:id', loginController.confirm_logged_in, userController.get_user_by_link)
router.get('/details', userController.account_created, userController.get_user_by_username)
router.get('/profilepicture', userController.account_created, userController.get_profile_picture)
router.get('/user_completed_form', userController.account_created, userController.get_survey_complete)
router.get('/datesblocked', userController.account_created, userController.get_dates_blocked)

router.post('/createaccount', loginController.confirm_logged_in, userController.post_create_user)
router.post('/updateaccount', userController.account_created, userController.post_update_user)
router.post('/deleteuser', loginController.confirm_logged_in, userController.post_delete_user) 
router.post('/update_profile_pic', userController.account_created, userController.post_update_propic)
router.post('/updatecalendar', userController.account_created, userController.post_update_dates_blocked)
router.post('/change_participating_status', userController.account_created, userController.change_chat_status) 
router.post('/updateabout', userController.account_created, userController.post_update_about)
router.post('/form_submit', userController.account_created, userController.post_form_response)
router.post('/paircalendar', userController.account_created, userController.post_generate_schedule)

//general information getting 
router.get('/form/:form_number', apiController.get_form)
router.get('/all_users', apiController.get_all_users) 
router.get('/all_users_participating', apiController.get_all_users_with_participating)
router.post('/profilecard', apiController.get_profile_card)

//admin-routes
router.get('/matchedwith', adminController.get_receive_matchings)
router.get('/allmatches',  adminController.check_admin, adminController.get_all_pairings)
router.get('/pendingmatches', adminController.check_admin, adminController.get_pending_pairing)
router.get('/pastmatches', adminController.check_admin, adminController.get_past_matchings)

router.post('/updatepending', adminController.check_admin, adminController.save_pending_pairing)
router.post('/addform', adminController.check_admin, adminController.post_form)
router.post('/generatematches', adminController.check_admin, adminController.post_run_algorithm)
router.post('/push_matches', adminController.check_admin, adminController.post_push_matchings)

//gallery-controller
router.get('/usergallery', galleryController.get_gallery_by_user)
router.get('/gallery', galleryController.get_gallery_items)

router.post('/uploadchatcard', galleryController.post_chat_card)
router.post('/uploadphoto', galleryController.post_picture_without_linking)
router.post('/updatechatcard', galleryController.update_chat_card)
router.post('/deletechatcard', adminController.check_admin, galleryController.delete_chat_card)

module.exports = router