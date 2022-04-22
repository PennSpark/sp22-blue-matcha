var User = require('../models/user');
var FormResponses = require('../models/formResponses')
var Matches = require('../models/matches')
var algorithmController = require('./edmonds');
var galleryController = require('./galleryController')

exports.get_receive_matchings = function(req, res, next) {
    Matches.findOne({'currently_on': true}).exec(
        function (err, results) {
            if (err) { return next(err)}
            if (!results) { res.status(200).json({chat: false, message: 'There are no current matchings out.'})
            } else {
                const pairing = results.matches_generated.find(match => 
                    match.user === req.user.username)
                if (!pairing) {
                    res.status(200).json({chat: false, message: 'You didn\'t opt in for a coffee chat this week!'})
                } else {
                    res.status(200).json(pairing)
                }
            }
        }
    )
    //first find the user logged in 
    //checks if they have a matching this week. 
    //if not they should return send w/ message they they do not have a matching 
    // else. return 1) profile card 2) chat card that they can fill out 
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
                var updated_match = new Matches(req.body)
                Matches.updateMany({'currently_on': true}, {'currently_on': false}, function (err, docs) {
                    if (err) {return next(err)}
                })
                Matches.findOneAndUpdate({'_id': updated_match._id}, {'currently_on': true}, function (err, doc) {
                    if (err) { return next(err) }
                    res.status(200).json(doc)
                })
            }
    })
}

//implement this later 
// makesyre 
const matchVerification = match => {
    //for each item in match, make sure that the person that a user is matched to is also matched to them. 
}