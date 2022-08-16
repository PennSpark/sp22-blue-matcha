const User = require('../models/user')
const FormSend = require('../models/formSend')

exports.get_form = (req, res, next) => {
    var formNum = req.params.form_number
    FormSend.find({form_number: formNum}).exec(
        function (err, result) {
            if (err) {
return next(err) 
}
            if (result == null) {
                res.status(400).json({message: "Form doesn't exist."})
            } else {
                res.status(200).json(result) 
            }
        }
    )
}

exports.get_profile_card = (req, res, next) => {
    User.findOne({userLogin: req.body.username}).populate('profile_picture', { image_url: 1 })
    .select({first_name: 1, last_name: 1, phone_number: 1, major: 1, year_of_grad: 1, 
        about: 1, profile_picture: 1, activities: 1, _id: 0}).exec(
            (err, result) => {
                if (err) {
return next(err) 
}
                if (result) { 
                    res.status(200).json(result)
                } else {
                    res.status(400)
                }
            }
        )
}

exports.get_all_users = (req, res, next) => {
    User.find({}).select({first_name: 1, last_name: 1, userLogin: 1, _id: 0}).exec(
        function(err, result) {
            if (err) {
return next(err) 
}
            res.status(200).json(result)
        }
    )
}

exports.get_all_users_with_participating = (req, res, next) => {
    User.find({}).select({first_name: 1, last_name: 1, userLogin: 1, chat_participating: 1, _id: 0}).exec(
        function(err, result) {
            if (err) {
return next(err) 
}
            res.status(200).json(result)
        }
    )
}