var User = require('../models/user');
var Gallery = require('../models/gallery')
exports.get_gallery_items = function(req, res, next) {
    Gallery.find({'complete': true}).exec(
        function (err, list) {
            if (err) { return next(err); }
            if (list.length > 0) {
                res.status(200).json(list);
            }
        }
    )
}

exports.post_chat_card = function (req, res, next) {
    User.findOne({userLogin : req.user.username})
    .exec(function (err, result) {
        if (err) { return next(err); }
        if (result) {
            Gallery.find({submitted_by: req.user.username, matching_id: req.body.match_id}).exec(function(err, result) {
                if (result.length > 0) {
                    res.status(409).json({message: 'You have already submitted a chat card for this matching.'})
                } else {
                    var card = new Gallery({
                        date: new Date(),
                        submitted_by: req.user.username, 
                        chatted_with: req.body.chatted_with, 
                        matching_id: req.body.match_id, 
                        chat_card: req.body.chat_card, 
                        complete: false
                    })
                    card.save(
                        function (err) {
                        if (err) { return next(err); }
                        // Successful - redirect to new author record.
                        res.status(200).json(user);
                    })
                }
            })
        } else { 
            res.status(409).json({message: 'You must be logged in to create a chat card.'})
        }
    })
}

exports.update_chat_card = function (req, res, next) {
    Gallery.find({matching_id: req.body.match_id}).exec(
        function(err, result) {
            if (err) {return next(err)}
            if (result) {
                const oldID = result._id;
                let updated_chat = new Gallery({
                    chat_card: req.body.chat_card, 
                    complete: req.body.complete,
                    _id: oldID
                })
                Gallery.findOneAndUpdate({'_id': oldID}, updated_chat, {}, function (err, updated_card) {
                    if (err) {return next(err)}
                    res.status(200).json(updated_card)
                })
            }
        }
    )
}

exports.get_gallery_by_user = function (req, res, next) {
    Gallery.find({submitted_by: req.body.username}).exec({
        function (err, results) {
            if (err) { next(err) }
            res.status(200).json(results);
        }
    })
}

//be able to delete if you're an admin or if you
exports.delete_chat_card = function (req, res, next) {
    Gallery.findById(req.body.cardId).exec({
        function (err, chatcard) {
            if (err) { next(err) }
            if (!chatcard) {
                res.status(404).json({message: 'Chatcard not found.'})
            }
            User.findOne({userLogin : req.user.username}).exec(
            function (err, result) {
                if (err) { next(err) }
                if (!result.admin && result != chatcard.submitted_by) {
                    res.status(409).json({message: 'Not authorized to delete chatcard.'})
                } else {
                    chatcard.remove().exec()
                    res.status(200).json({message: "Successfully deleted"});
                }
            })
        }
    })
}