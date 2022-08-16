const User = require('../../models/user')
const Matches = require('../../models/matches')
const algorithmController = require('./edmonds')
const FormSend = require('../../models/formSend')

exports.check_admin = function(req, res, next) {
    User.findOne({userLogin: req.user.username}).exec(
        function (err, account) {
            if (err) {
                return next(err) 
            }
            if (!account || account.admin === undefined) {
                res.status(403).json({message: 'Not an admin'})
            } else if (!account.admin) {
                res.status(403).json({message: 'Not an admin'})
            } else {
                next()
            }
        }
    )
}

exports.get_profile_card = function (req, res, next) {
    User.findOne({userLogin: req.body.username}).populate('profile_picture', { image_url: 1 }).select({first_name: 1, last_name: 1, phone_number: 1, 
        major: 1, year_of_grad: 1, about: 1, profile_picture: 1, activities: 1, _id: 0}).exec(
        function(err, result) {
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

exports.get_receive_matchings = function(req, res, next) {
    Matches.findOne({currently_on: true}).exec(
        function (err, results) {
            if (err) {
 return next(err)
}
            if (!results) {
 res.status(404).json({chat: false, message: 'There are no current matchings out.'})
            } else {
                const pairing = results.matches_generated.find(match => 
                    match.user === req.user.username)
                if (!pairing) {
                    res.status(400).json({chat: false, message: 'You didn\'t opt in for a coffee chat this week!'})
                } else {
                    res.status(200).json(pairing)
                }
            }
        }
    )
}

//need to gatekeep non admin users later 
exports.get_all_pairings = function (req, res, next) {
    Matches.findOne({currently_on: true}).exec(
        function (err, result) {
            if (err) {
return next(err)
}
            if (result) { 
                res.status(200).json(result)
            } else { 
                res.status(400).json({message: 'no current pairings!'})
            }
        }
    )
}

exports.get_past_matchings = function (req, res, next) {
    Matches.find({pushed_in_past: true}).exec(
        function (err, results) {
            res.status(200).json(results)
        }
    )
}

exports.save_pending_pairing = function (req, res, next) {
    const newMatching = req.body
    Matches.findOne({_id: newMatching._id}).exec(
        function(err, results) {
            if (err) {
return next(err) 
}
            if (results==null) { // No results.
                res.status(400).json({message: 'No matching with that ID'})
            } else {
                Matches.findOneAndUpdate({_id: newMatching._id}, newMatching, {}, 
                function (err, matching) {
                if (err) {
 return next(err) 
}
                   // Successful - redirect to book detail page.
                   res.status(200).json({ 
                       message: 'success!'})
                }
            )
}
        }
    )
}

exports.get_pending_pairing = function (req, res, next) {
    Matches.find().sort({ date : -1 }).limit(1).exec(
        (err, result) => {
            const match = result[0]
            if (err) {
return next(err)
}
            if (match.currently_on || match.pushed_in_past) {
                res.status(404).json({message: 'No pending pairing right now.'})
            } else {
                res.status(200).json(result[0])
            }
        }
    )
}

//gets a generated amount of matchings 
exports.post_run_algorithm = function (req, res, next) {
    algorithmController.edmonds_algorithm(req, res, next)
}

exports.post_push_matchings = function (req, res, next) {
    var updated_match = req.body
    updated_match.currently_on = true
    Matches.findOneAndUpdate({currently_on: true}, {currently_on: false, pushed_in_past: true}, function (err, docs) {
        if (err) {
return next(err)
}
        Matches.findOneAndUpdate({_id: updated_match._id}, updated_match, function (err, doc) {
            if (err) {
 return next(err) 
}
            res.status(200).json(doc)
        })
    })
}

exports.post_form = function(req, res, next) {
    const formQuestion = new FormSend({
        question: req.body.question, 
        type: req.body.type, 
        options: req.body.options, 
        form_number: req.body.form_number,
    })
    formQuestion.save(function (err) {
        if (err) {
 return next(err) 
}
        res.status(200).json(formQuestion)
    })
}