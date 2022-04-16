var passport = require('passport');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcryptjs');
var Login = require('../models/login'); 
var User = require('../models/user');
var FormSend = require('../models/formSend');
var FormResponses = require('../models/formResponses');

const { body,validationResult } = require('express-validator');

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
  
/*
    sign up for an account
*/
exports.post_sign_up = function(req, res, next) {
    Login.find({username : req.body.username})
    .exec(function (err, u_list) {
      if (err) { return next(err); }
      if (u_list.length > 0) {
        res.status(406).json({message: "User already exists. You cannot create an account!"});
      } else { 
        const user = new Login();
        user.username = req.body.username;
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            user.password = hash;
            user.save(err => {
              if (err) { 
                return next(err);
              }
              res.status(200).json({message: "Success. User created."});
            });
        })
      }
    })
  };

  exports.get_log_in = function(req, res, next) {
    if (req.user) {
      User.findOne({'userLogin': req.user.username}).exec(function (err, user_list) {
        if (err) { return next(err); }
        //Successful, so render
        if (user_list) {
          res.status(200).json({ user: req.user, userDetail: user_list});
        } else {
          res.status(200).json({ user: req.user });
        }
      });
    } else {
      res.status(404).json({message: "User account doesn't exist."});
    }
  }; 
  
  exports.get_username = function(req, res) {
    if (req.user) {
      res.json(req.user.username)
    } else {
      res.status(406).json({message: "Not signed in"})
    }
  };

  exports.password_authenticate = passport.authenticate('local', {
      successRedirect: '/login/success',
      failureRedirect: '/login/failure',
      failureMessage: false
  });

  exports.success_login = function(req, res) {
      res.status(200).json({message: "Success! You're logged in."});
  }
  
  exports.failure_login = function(req, res) {
      res.status(401).json({message: "Invalid password or user."});
  }

  exports.log_out = function(req, res, next) {
    req.logout();
    res.status(200).json({message: "Successfully logged out."});
  }

/*figure it you want to santize the data later*/ 
exports.post_create_user = function(req, res, next) {
    User.find({'userLogin': req.user.username})
    .exec(function (err, user_list) {
      if (err) { return next(err); }
      //Successful, so render
      if (user_list.length > 0) {
        res.status(400).json({message: "User already created."})
        return;
      };
    });
    var user = new User(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            year_of_grad: req.body.year_of_grad,
            email: req.body.email,
            date_created_account: new Date(), 
            userLogin: req.user.username
        });
    user.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.status(200).json(user);
    });
}

exports.post_update_user = [
    // Validate and sanitize fields.
    body('first_name', 'First name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('last_name', 'Last name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('year_of_grad', 'Graduation Year must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('email', 'Email must not be empty').trim().isLength({ min: 1 }).escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Create a Book object with escaped/trimmed data and old id.
        User.findOne({"userLogin": req.user.username}).exec(
            function (err, results) {
                if (err) {return next(err); }
                if (results==null) { // No results.
                    res.status(400).json({message: "User doesn't have account."})
                }
                const oldID = results._id;
                var updated_user = new User(
                    { first_name: req.body.first_name,
                      last_name: req.body.last_name, 
                      email: req.body.email,
                      year_of_grad: req.body.year_of_grad,
                      _id: oldID //This is required, or a new ID will be assigned!
                     });
                if (!errors.isEmpty()) {
                        // There are errors. Render form again with sanitized values/error messages.
                        // Get all authors and genres for form.
                        res.render('user', { title: 'Update Account', 
                        first_name: results.first_name, 
                        last_name: results.last_name, 
                        year_of_grad: results.year_of_grad,
                        email: results.email, errors: errors.array()
                        });
                        return;
                    } else {
                        // Data from form is valid. Update the record.
                        User.findOneAndUpdate({"userLogin": req.user.username}, updated_user, {}, function (err, user) {
                            if (err) { return next(err); }
                               // Successful - redirect to book detail page.
                               res.status(200).json(user);
                            });
                    }  
            }
        )
    }
]

//delete account if needed. 
exports.post_delete_user = function (req, res, next) {
    let user_name = req.user.username; 
    req.logout(); 
    Login.find({'username': user_name}).remove().exec(); 
    User.find({'userLogin': user_name}).remove().exec();
    res.status(200).json({message: "Successfully deleted"});
}

//view user information in dashboard 
exports.get_user_info = function(req, res, next) {
    //check whether or not the request is from the correct user 
    //const {user} = req.user;
    User.findById(req.params.id)
        .exec(function (err, result) {
            if (err) { return next(err); }
            if (result==null) { // No results.
                res.status(400).send({message: "User not found."})
            }
            if (result.userLogin !== req.user.username) {
                //change to user url 
                res.status(400).send({message: "Invalid credentials to view user details."})
            } else {
                res.status(200).send(result);
            }
    });
}

//render the form information 
exports.post_form_response = function(req, res, next) {
    var formQuestion = new FormSend(
        {
            username: req.body.username, 
            selected: req.body.selected,
            question: req.body.question, 
            type: req.body.type, 
            options: req.body.options, 
            form_number: req.body.form_number,
        });
    formQuestion.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.status(200).json(formQuestion);
    });
}

exports.post_form = function(req, res, next) {
    var formQuestion = new FormSend(
        {
            question: req.body.question, 
            type: req.body.type, 
            options: req.body.options, 
            form_number: req.body.form_number,
        });
    formQuestion.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.status(200).json(formQuestion);
    });
}

exports.get_form = function(req, res, next) {
    var formNum = req.params.form_number
    FormSend.find({'form_number': formNum}).exec(
        function (err, result) {
            if (err) {return next(err); }
            if (result == null) {
                res.status(400).json({message: "Form doesn't exist."})
            } else {
                res.status(200).json(result); 
            }
        }
    )
}
