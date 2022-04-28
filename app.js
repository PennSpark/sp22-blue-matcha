var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser')
var cors = require('cors')
var async = require('async')

var apiRouter = require('./routes/api');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');

var mongoDB = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session')); //equivalent to app.use(passport.session())
app.use('/api', apiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err)
  res.status(err.status || 500).send(`${err.message}`)
});

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static(path.resolve(__dirname, 'frontend', 'build'), {extensions: ["js"]}));
  app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, '/frontend/build/index.html'));
  });
} else {
  //app.use(express.static(path.join(__dirname, '/frontend/public')));
}

module.exports = app;
