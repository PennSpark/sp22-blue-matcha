var passport = require('passport');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcryptjs');
var Login = require('../models/login'); 
var User = require('../models/user');
var userController = require('../controllers/userController');

exports.sign_up = function(req, res, next) {
  Login.find({ username : req.body.username})
  .exec(function (err, u_list) {
    if (err) { return next(err); }
    if (u_list.length > 0) {
      res.render('sign-up-form', {message: "User already exists, try again!"});
    } else { 
      const user = new Login();
      //add failure mode where if user has the same user as before then make them do new acct
      user.username = req.body.username;
      bcrypt.hash(req.body.password, 10, (err, hash) => {
          user.password = hash;
          user.save(err => {
            if (err) { 
              return next(err);
            }
            res.redirect("/");
          });
      })
    }
  })
};

passport.use(new LocalStrategy(function verify(username, password, done) {
  Login.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user)
          } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
          }
        })
    });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

exports.get_log_in = function(req, res, next) {
  if (req.user) {
    User.findOne({'userLogin': req.user.username}).exec(function (err, user_list) {
      if (err) { return next(err); }
      //Successful, so render
      if (user_list) {
        res.render('index', { user: req.user, failure: false, userDetail: user_list});
      } else {
        res.render('index', { user: req.user, failure: false, userDetail: null});
      }
    });
  } else {
    res.render('index', { user: req.user, failure: false, userDetail: null});
  }
}; 

exports.get_log_in_fail = function(req, res, next) {
  res.render('index', { user: req.user, failure: true, userDetail: null});
}; 

exports.get_sign_up = function(req, res) {
  res.render('sign-up-form')
};

exports.password_authenticate = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/failure',
    failureMessage: true
});

exports.log_out = function(req, res, next) {
  req.logout();
  res.redirect("/");
}
