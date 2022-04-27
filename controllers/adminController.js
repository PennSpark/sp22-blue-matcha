var User = require('../models/user');
var FormResponses = require('../models/formResponses')
var Matches = require('../models/matches')
var algorithmController = require('./edmonds');
var galleryController = require('./galleryController')

exports.get_receive_matchings = function(req, res, next) {
    Matches.findOne({'currently_on': true}).exec(
        function (err, results) {
            if (err) { return next(err)}
            if (!results) { res.status(404).json({chat: false, message: 'There are no current matchings out.'})
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
    Matches.findOne({'currently_on': true}).exec(
        function (err, result) {
            if (err) {return next(err)}
            if (result) { 
                res.status(200).json(result)
            } else { 
                res.status(400).json({message: 'no current pairings!'})
            }
        }
    )
}

exports.get_past_matchings = function (req, res, next) {
    Matches.find({"pushed_in_past": true}).exec(
        function (err, results) {
            res.status(200).json(results)
        }
    )
}

exports.save_pending_pairing = function (req, res, next) {
    const newMatching = req.body
    Matches.findOne({'_id': newMatching._id}).exec(
        function(err, results) {
            if (err) {return next(err); }
            if (results==null) { // No results.
                res.status(400).json({message: "No matching with that ID"})
            } else {
                Matches.findOneAndUpdate({'_id': newMatching._id}, newMatching, {}, 
                function (err, matching) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.status(200).json({ 
                       message: "success!"});
                }
            )}
        }
    )
}

exports.get_pending_pairing = function (req, res, next) {
    Matches.find().sort({ "date" : -1 }).limit(1).exec(
        (err, result) => {
            const match = result[0]
            if (err) {return next(err)}
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
    if (!req.user) {
        return res.status(400).json({message: 'please sign in.'})
    } else {
        User.findOne({'userLogin': req.user.username}).exec(
            function (err, account) {
                if (err) { return next(err) }
                if (!account.admin) {
                    res.status(400).json({message: 'Not an admin'})
                } else {
                    algorithmController.edmonds_algorithm(req, res, next)
                }
            }
        )
    }
}

/* you will have to disable 1) current matchings selected. 2) update the new matchings
 */
exports.post_push_matchings = function (req, res, next) {
    User.findOne({'userLogin': req.user.username}).exec(
        function (err, account) {
            if (err) { return next(err) }
            if (!account.admin) {
                res.status(400).json({message: 'Not an admin'})
            } else {
                var updated_match = req.body
                updated_match.currently_on = true
                Matches.findOneAndUpdate({'currently_on': true}, {'currently_on': false, 'pushed_in_past': true}, function (err, docs) {
                    if (err) {return next(err)}
                    Matches.findOneAndUpdate({'_id': updated_match._id}, updated_match, function (err, doc) {
                        if (err) { return next(err) }
                        res.status(200).json(doc)
                    })
                })
            }
    })
}

//implement this later 
// makesyre 
const matchVerification = match => {
    //for each item in match, make sure that the person that a user is matched to is also matched to them. 
}