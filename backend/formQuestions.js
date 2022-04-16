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
//var User = require('./models/user')
var Question = require('./models/formSend')
var mongoose = require('mongoose');
const { getMaxListeners } = require('./app');
var mongoDB = 'mongodb+srv://pennspark:team1matchamakers@cluster0.cx4rx.mongodb.net/Cluster0?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var questions = []
function questionCreate(question, type, options, form_number, cb) {
  questionDetail = {question:question , type: type, options: options, form_number: form_number }
  
  var question = new Question(questionDetail);
       
  question.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + question);
    questions.push(question)
    cb(null, question)
  }  );
}
//first_name, last_name, year_grad, email, cb
function createQuestions(cb) {
    async.series([
        function(callback) {
          questionCreate('Which Penn dining hall are you?', 'MC', 
          ['Commons - this is just sad', 
          'Hill - okay freshman!', 
          'McClelland - chickens nuggets over rice?? say less', 
          'Houston Market - let\'s be honest, you only get bento'], 
          1, callback);
        },
        function(callback) {
          questionCreate('What\'s your BEST Spark-themed pickup line?', 'Long', 
          [], 
          1, callback);
        },
        function(callback) {
          questionCreate('What\'s your MBTI personality type (N/A if you don\'t know)?', 'Short', 
          [], 
          1, callback);
        },
        function(callback) {
          questionCreate('You\'re invited to a Spark study session - which one are you most likely to go to?', 'MC', 
          ['I will destroy EVERYONE and show off my skills in a game of League', 
          'An ACTUAL grind session...boringgg!', 
          'The one where you say you\'re going to study but just end up talking for 3 hours', 
          'I don\'t study with these losers lol'], 
          1, callback);
        },
        function(callback) {
          questionCreate('What Spark social event are you most likely to go to?', 'MC', 
          ['Only a BYO because u know I\'m an alcoholic', 
          'Baking nightttt - all I need are cookies and good vibes', 
          'I just wanna see Grac and Oz fight at cultural night', 
          'The only social things I do are coffee chats:((('], 
          1, callback);
        },
        function(callback) {
          questionCreate('What Harry Potter House are you in?', 'MC', 
          ['Gryffindor', 
          'Ravenclaw', 
          'Hufflepuff', 
          'Slytherin'], 
          1, callback);
        },
        function(callback) {
          questionCreate('If you were a color in the rainbow, what color would you be?', 'MC', 
          ['Red', 
          'Orange', 
          'Yellow', 
          'Green',
          'Blue',
          'Indigo',
          'Violet'], 
          1, callback);
        },
        function(callback) {
          questionCreate('Which board member would you bring with you if you were stranded on a deserted island?', 'MC', 
          ['Grac', 
          'Christina', 
          'Andrew', 
          'Ethan',
          'Janice'], 
          1, callback);
        },
        function(callback) {
          questionCreate('What\'s been your favorite class at Penn so far?', 'Short', 
          [], 
          1, callback);
        },
        function(callback) {
          questionCreate('Which school is your least favorite?', 'MC', 
          ['Wharton - understandable',
          'SEAS',
          'CAS',
          'Nursing'], 
          1, callback);
        },
        ],
        // optional callback
        cb);
}
async.series([
    createQuestions
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Questions: '+ questions);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
