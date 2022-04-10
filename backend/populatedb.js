#! /usr/bin/env node
console.log('This script populates some sample items'); 

// Get arguments passed on command line
//var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var User = require('./models/user')

var mongoose = require('mongoose');
const { getMaxListeners } = require('./app');
var mongoDB = 'mongodb+srv://pennspark:team1matchamakers@cluster0.cx4rx.mongodb.net/Cluster0?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []

function userCreate(first_name, last_name, year_grad, email, cb) {
  userDetail = {first_name:first_name , last_name: last_name, year_of_grad: year_grad, email: email }
  
  var user = new User(userDetail);
       
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  }  );
}

//first_name, last_name, year_grad, email, cb
function createUsers(cb) {
    async.series([
        function(callback) {
          userCreate('Alyssa', 'Nie', 2025, 'alynie@wharton.upenn.edu', callback);
        },
        function(callback) {
          userCreate('Rain', 'Yan', 2025, 'xcyan@seas.upenn.edu', callback);
        },
        function(callback) {
          userCreate('Claire', 'Zhang', 2024, 'czhangz@seas.upenn.edu', callback);
        },
        function(callback) {
          userCreate('Dhatri', 'Medarametla', 2024, 'dhatrim@seas.upenn.edu', callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createUsers
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Users: '+ users);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

