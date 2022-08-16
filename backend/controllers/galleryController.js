var User = require('../models/user')
var Gallery = require('../models/gallery')
var imageMiddleware = require('./imageController.js')
var Image = require('../models/image')
var mongoose = require('mongoose')


exports.get_gallery_items = function(req, res, next) {
    Gallery.find({}).sort({date : -1}).populate('photo', { image_url: 1 }).exec(
        function (err, list) {
            if (err) {
 return next(err) 
}
            if (list.length > 0) {
                res.status(200).json(list)
            } else {
                res.status(400)
            }
        }
    )
}

exports.post_picture_without_linking = [imageMiddleware.post_upload_image, (req, res, next) => {
    if (req.uploaded_image) {
        res.status(200).json(req.stored_image)
    } else {
        res.status(404)
    }
}]

//upload a card. 
exports.post_chat_card = (req, res, next) => {
    User.findOne({userLogin : req.user.username})
    .exec(function (err, result) {
        if (err) {
 return next(err) 
}
        if (result) {
            let img = null
            var card = new Gallery({
                date: req.body.date,
                submitted_by: req.user.username, 
                facts: req.body.facts, 
                people: req.body.people, 
                photo: req.body.photo
            })
            card.save(
                function (err) {
                if (err) {
 return next(err) 
}
                res.status(200).json(card)
            })
        } else { 
            res.status(409).json({message: 'You must be logged in to create a chat card.'})
        }
    })
}

//update a card: 1) make sure that the user is the same.  
exports.update_chat_card = function (req, res, next) {
    Gallery.findById(req.body.card_id).exec(
        function(err, result) {
            if (err) {
return next(err)
}
            if (result.userLogin !== req.user.username) {
                res.status(400).json({message: 'user is not the same'})
            } else if (result) {
                const oldID = result._id
                var updated_card = new Gallery({
                    date: req.body.date,
                    facts: req.body.facts, 
                    people: req.body.people, 
                    photo: req.body.photo
                })
                if (req.uploaded_image) {
                    updated_card.photo = req.stored_image
                }
                Gallery.findByIdAndUpdate(req.body.card_id, updated_card, {}, function (err, updated_card) {
                    if (err) {
return next(err)
}
                    res.status(200).json(updated_card)
                })
            }
        }
    )
}

exports.get_gallery_by_user = function (req, res, next) {
    Gallery.find({submitted_by: req.body.username}).exec({
        function (err, results) {
            if (err) {
 next(err) 
}
            res.status(200).json(results)
        }
    })
}

//be able to delete if you're an admin or if you
exports.delete_chat_card = function (req, res, next) {
    //const card_id = new mongoose.Types.ObjectId(req.body.card_id);
    Gallery.findOne({_id: req.body.chat_id}).exec(
        function (err, chatcard) {
            if (err) {
 next(err) 
}
            if (!chatcard) {
                res.status(404).json({message: 'Chatcard not found.'})
            } else {
                User.findOne({userLogin : req.user.username}).exec(
                    function (err, result) {
                        if (err) {
 next(err) 
}
                        if (!result.admin && result !== chatcard.submitted_by) {
                            res.status(409).json({message: 'Not authorized to delete chatcard.'})
                        } else {
                            Gallery.deleteOne(chatcard, function (err, obj) {
                                res.status(200).json({message: 'Successfully deleted'})
                            })
                        }
                    })
            }
        }
    )
}