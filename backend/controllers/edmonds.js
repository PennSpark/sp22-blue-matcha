var User = require('../models/user');
var FormResponses = require('../models/formResponses')
var Matches = require('../models/matches')
var async = require('async');
var blossom = require("edmonds-blossom");
const FORM_NUMBER = 1; 
const STARTING_UTILITY_POINTS = 5; 

/**
 * todo: specific a param for req.body.number for which form to run 
 * the algorithm on. 
 * create a true for 1) allowing users to "match-make", 2) allowing users to request. 
 * match-making increases compatibility function & users can request 
 */
exports.edmonds_algorithm = function(req, res, next) {
  //Matches.find() if there exists a match alr generated for that week. 
  async.waterfall([
    function(callback) {
      User.find({"chat_participating": true}).exec(
        function(err, user_list) {
          callback(null, user_list)
        }
      )
    }, function(user_list, callback) {
      let username_list = []
      user_list.forEach(user => username_list.push(user.userLogin))
      // arg1 now equals 'one' and arg2 now equals 'two'
      callback(null, user_list, username_list)
    }, function(user_list, username_list, callback) {
      FormResponses.find({"username": username_list}).exec(
        function (err, form_list) {
          callback(null, user_list, form_list)
        }
      )
    }
  ], function (err, user_list, form_list) {
    user_list.forEach( (user, index) => {
      var newArray = form_list.find(
        f => f.username === user.userLogin
      )
      user.index = index
      if (newArray) {
        user.responses = newArray.responses
      }
      user.blockList = user.users_chatted.concat(user.users_blocked)
    })
    let userQueue = user_list
    let edmondArray = []
    user_list.forEach((user) => {
      //run a BFS search to construct edges. 
      userQueue = userQueue.filter(e => e.userLogin != user.userLogin)
      userQueue.forEach( (other) => {
        if (!user.blockList.includes(other.userLogin) && 
        !other.blockList.includes(user.userLogin)) {
          let weight = compatibilityScore(user.responses, other.responses)
          const edge = [user.index, other.index, weight]
          edmondArray.push(edge)
        }
      })
    })
    var results = blossom(edmondArray);
    //save the results into a schema 
    var translatedResults = []
    results.forEach((x, index) => {
      const item = {
        "user": user_list[index].userLogin
      }
      let matched = null
      let got_match = false
      if (x != -1) {
        matched = user_list.find(e => e.index == x)
        got_match = true
        item.matched_with = matched.userLogin
      }
      item.received_match = got_match
      translatedResults.push(item)
    })
    var match = new Matches({
        date: new Date(), 
        form_used: FORM_NUMBER, 
        matches_generated: translatedResults,
        currently_on: false
      })
    match.save(function (err) {
      if (err) { return next(err);}
      // Successful - redirect to new author record.
      res.status(200).json(match);
    })
  })
}

/**
 * 
 * @param {*} user1_res List of form responses that user one provided
 * @param {*} user2_res List of form responses that user two provided
 * @returns Compability score of two users based on equality of forms. 
 */
function compatibilityScore(user1_res, user2_res) {
  let score = STARTING_UTILITY_POINTS; 
  if (!user1_res || !user2_res) {
    return score; 
  }
  user1_res.forEach(user => {
    const found = user2_res.find(e => e.question === user.question)
    if (found) {
      if (user.selected == found.selected) {
        score++;
      }
    } 
  })
  return score
}