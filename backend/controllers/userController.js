const Login = require('../models/login')
const User = require('../models/user')
const FormResponses = require('../models/formResponses')
const calendarAlgorithm = require('./calendar.js')
const imageMiddleware = require('./imageController.js')
const loginController = require('./loginController')

const { body, validationResult } = require('express-validator')

exports.get_username = function(req, res) {
    res.status(200).json(req.user.username)
}

exports.account_created = [loginController.confirm_logged_in, (req, res, next) => {
    User.findOne({'userLogin': req.user.username}).exec((err, user) => {
        if (user) {
            next()
        } else {
            res.status(400).json({message: 'User does not have account.'})
        }
    })
}]

exports.post_create_user = (req, res, next) => {
    User.find({'userLogin': req.user.username})
    .exec(function (err, user_list) {
        if (err) { return next(err); }
        if (user_list.length > 0) {
            res.status(409).json({message: "User already created."})
            return
        }
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            year_of_grad: req.body.year_of_grad,
            email: req.body.email,
            phone_number: req.body.phone_number, 
            gender: req.body.gender, 
            major: req.body.major, 
            year_joined_spark: req.body.year_joined_spark, 
            spark_role: req.body.spark_role, 
            chat_participating: false,
            date_created_account: new Date(), 
            userLogin: req.user.username, 
            users_chatted: req.body.users_chatted, 
            activities: req.body.activities,
            users_blocked: req.body.users_blocked, 
            dates_blocked: [], 
            about: ''
        })
        user.save(function (err) {
            if (err) { return next(err); }
            res.status(200).json(user);
        })
    })
}

exports.get_dates_blocked = function(req, res, next) {
    User.findOne({"userLogin": req.user.username}).select({dates_blocked: 1, _id: 0})
    .exec(
        function (err, results) {
            res.status(200).json(results)
        }
    )
}

exports.post_update_about = function(req, res, next) {
    User.findOneAndUpdate({"userLogin": req.user.username}, {'about': req.body.about}, {}, 
    function (err, user) {
        if (err) { return next (err) }
        res.status(200)
    })
}

exports.post_update_dates_blocked = function(req, res, next) {
    User.findOneAndUpdate({"userLogin": req.user.username}, {'dates_blocked': req.body.dates}, {}, 
    (err, user) => {
        if (err) { return next(err) }
        res.status(200)
    })
}

exports.post_update_user = [
    // Validate and sanitize fields.
    body('first_name', 'First name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('last_name', 'Last name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('year_of_grad', 'Graduation Year must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('email', 'Email must not be empty').trim().isLength({ min: 1 }).escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Create a Book object with escaped/trimmed data and old id.
        User.findOne({"userLogin": req.user.username}).exec(
            function (err, results) {
                if (err) {return next(err); }
                const oldID = results._id;
                var updated_user = new User(
                    { first_name: req.body.first_name,
                      last_name: req.body.last_name, 
                      email: req.body.email,
                      year_of_grad: req.body.year_of_grad,
                      phone_number: req.body.phone_number, 
                      gender: req.body.gender, 
                      major: req.body.major, 
                      year_joined_spark: req.body.year_joined_spark, 
                      spark_role: req.body.spark_role, 
                      users_chatted: req.body.users_chatted, 
                      users_blocked: req.body.users_blocked,
                      activities: req.body.activities,
                      _id: oldID //This is required, or a new ID will be assigned!
                     });
                if (!errors.isEmpty()) {
                        // There are errors. Render form again with sanitized values/error messages.
                        // Get all authors and genres for form.
                        res.status(400).json(errors);
                        return;
                    } else {
                        // Data from form is valid. Update the record.
                        User.findOneAndUpdate({"userLogin": req.user.username}, updated_user, {}, function (err, user) {
                            if (err) { return next(err); }
                               // Successful - redirect to book detail page.
                               res.status(200).json(user);
                            });
                    }  
            }
        )
    }
]

//delete your own account by user 
exports.post_delete_user = function (req, res, next) {
    let user_name = req.user.username; 
    req.logout(); 
    Login.find({'username': user_name}).remove().exec(); 
    User.find({'userLogin': user_name}).remove().exec();
    res.status(200).json({message: "Successfully deleted"});
}

exports.change_chat_status = function(req, res, next) {
    var update = { 'chat_participating': req.body.status}
    User.findOneAndUpdate({'userLogin': req.user.username}, update, {}, 
    function (err, account) {
        if (err) { return next(err); }
            res.status(200).json({ 
                message: "success!"});
        }
    )
}

//view user information in dashboard 
exports.get_user_by_link = function(req, res, next) {
    User.findById(req.params.id)
        .exec(function (err, result) {
            if (err) { return next(err); }
            if (result==null) { // No results.
                res.status(400).json({message: "User not found."})
            }
            if (result.userLogin !== req.user.username) {
                res.status(400).json({message: "Invalid credentials to view user details."})
            } else {
                res.status(200).json(result);
            }
    });
}

//view user information in dashboard 
exports.get_user_by_username = function(req, res, next) {
    User.findOne({'userLogin': req.user.username})
    .exec((err, result) => {
        if (err) { return next(err) }
        res.status(200).json(result)
    })
}

exports.get_survey_complete = function(req, res, next) {
    FormResponses.findOne({'username': req.user.username}).exec(
        function(err, found_response) {
            if (err) { return next(err); }
            if (found_response) {
                res.status(200).json({'filled_form': true})
            } else {
                res.status(200).json({'filled_form': false})
            }
        }
    )
}

exports.post_form_response = function(req, res, next) {
    const formResponse = new FormResponses({
        username: req.body.username, 
        form_number: req.body.form_number,
        responses: req.body.responses,
    })
    FormResponses.findOne({'username': req.body.username}).exec(
        function(err, found_response) {
            if (err) { return next(err); }
            if (found_response) {
                res.status(400).json({message: 'Already filled out form.'})
            } else {
                formResponse.save(function (err) {
                    if (err) { return next(err); }
                    res.status(200).json(formResponse);
                });
            }
        }
    )
}

exports.get_form = function(req, res, next) {
    var formNum = req.params.form_number
    FormSend.find({'form_number': formNum}).exec(
        function (err, result) {
            if (err) {return next(err); }
            if (result == null) {
                res.status(400).json({message: "Form doesn't exist."})
            } else {
                res.status(200).json(result); 
            }
        }
    )
}

exports.update_user_chatted = function (req, res, next) {
    User.findOne({"userLogin": req.user.username}).exec(
        (err, result) => {
            if (err) {return next(err); }
            var usersChatted = result.usersChatted
            usersChatted.push(req.body.chattedUser)
            const update = { users_chatted: usersChatted }
            User.findOneAndUpdate({'userLogin': req.user.username}, update, {}, 
            (err, result) => {
                if (err) { return next(err); }
                   res.status(200).json({ 
                       message: "successfully updated user chatted!"});
                }
            )
        }
    )
}

//finds profile picture + adds id to request
const getPictureID = (req, res, next) => {
    User.findOne({'userLogin': req.user.username}).exec(
        function (err, result) {
            if (err) {
                next (err)
            }
            if (result) {
                if (result.profile_picture) {
                    req.picture_id = result.profile_picture
                }
            }
            next()
        }
    )
}

exports.post_update_propic = [imageMiddleware.post_upload_image, getPictureID, 
    imageMiddleware.delete_image, (req, res, next) => {
    if (req.uploaded_image) {
        const img = req.stored_image
        User.findOneAndUpdate({"userLogin": req.user.username}, {'profile_picture': img._id}, {}, 
        (err, user) => {
            if (err) { return next(err); }
            res.status(200).json(img.image_url)
        })
    } else {
        res.status(400).json({message: 'No picture received.'})
    }
}]

exports.get_profile_picture = [getPictureID, imageMiddleware.get_picture, (req, res, next) => {
    if (req.image_url) {
        res.status(200).json(req.image_url)
    } else {
        res.status(400).json({message: 'no image url inserted'})
    }
}]

exports.post_generate_schedule = function (req, res, next) {
    User.findOne({'userLogin': req.user.username}).select({dates_blocked: 1, _id: 0}).exec(
        function (err, result) {
            let times_a = []
            if (err) { return next(err)}
            if (result) {
                times_a = result.dates_blocked
            }
            User.findOne({'userLogin': req.body.requested_user}).select({dates_blocked: 1, _id: 0}).exec(
                function (err, result2) {
                    let times_b = []
                    if (result2) {
                        times_b = result2.dates_blocked
                    }
                    let availTimes = calendarAlgorithm.generateAvailability(times_a, times_b)
                    res.status(200).json(availTimes)
                } 
            )
        }
    )
}