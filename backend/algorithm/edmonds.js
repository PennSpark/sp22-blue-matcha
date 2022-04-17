
var User = require('../models/user');
var FormResponses = require('../models/formResponses')
var async = require('async');
var blossom = require("edmonds-blossom");

//results: [2,-1,0];
exports.edmonds_algorithm = function(req, res, next) {
  async.waterfall([
    function(callback) {
      User.find({"chat_participating": true}).exec(
        function(err, user_list) {
          callback(null, user_list)
        }
      )
    }, function(user_list, callback) {
      let username_list = []
      user_list.forEach(user => username_list.push(user.username))
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
        f => f.username === user.username
      ).responses
      user.index = index
      user.responses = newArray
      user.blockList = user.users_chatted.concat(user.users_blocked)
    })
    let userQueue = user_list
    let edmondArray = []
    user_list.forEach((user) => {
      userQueue = userQueue.filter(e => e.username != user.username)
      userQueue.forEach( (other) => {
        if (!user.blockList.includes(other.username) && 
        !other.blockList.includes(user.username)) {
          let weight = compatibilityScore(user.responses, other.responses)
          const edge = [user.index, other.index, weight]
          edmondArray.push(edge)
        }
      })
    })
    var results = blossom(edmondArray);
    var translatedResults = []
    results.forEach((x, index) => {
      let matched = null
      if (x != -1) {
        matched = user_list.find(e => e.index == x)
      }
      const item = {
        "user": user_list[index],
        "matched-with": matched
      }
      translatedResults.push(item)
    })
    res.json(translatedResults)
  }
  )
}
function compatibilityScore(user1_res, user2_res) {
  let score = 0; 
  user1_res.forEach(user => {
    const found = user2_res.find(e => e.question === user.question)
    if (!found) {
      continue;
    }
    if (user.selected == found.selected) {
      score++;
    }
  })
  return score
}