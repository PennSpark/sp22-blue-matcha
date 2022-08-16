const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const Login = require('../models/login')
const User = require('../models/user')

passport.use(new LocalStrategy(function verify(username, password, done) {
    Login.findOne({ username: username }, (err, user) => {
        if (err) { 
            return done(err)
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect username' })
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                // passwords match! log user in
                return done(null, user)
            } else {
                // passwords do not match!
                return done(null, false, { message: 'Incorrect password' })
            }
            })
        })
    }))
    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            cb(null, { id: user.id, username: user.username })
        })
    })
    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user)
    })
})

exports.post_sign_up = function(req, res, next) {
    Login.find({username : req.body.username})
    .exec(function (err, u_list) {
      if (err) {
 return next(err) 
}
      if (u_list.length > 0) {
        res.status(406).json({message: 'User already exists. You cannot create an account!'})
      } else { 
        const user = new Login()
        user.username = req.body.username
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            user.password = hash
            user.save(err => {
              if (err) { 
                return next(err)
              }
              res.status(200).json({message: 'Success. User created.'})
            })
        })
      }
    })
}

exports.confirm_logged_in = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.status(401).json({message: 'User isn\'t logged in.'})
    }
}

exports.get_log_in = function(req, res, next) {
    User.findOne({userLogin: req.user.username}).exec(function (err, user_list) {
        if (err) {
 return next(err) 
}
        //Successful, so render
        if (user_list) {
            res.status(200).json({ user: req.user, userDetail: user_list})
        } else {
            res.status(200).json({ user: req.user })
        }
    })
}

exports.password_authenticate = passport.authenticate('local', {
    successRedirect: '/api/login/success',
    failureRedirect: '/api/login/failure',
    failureMessage: false
})

exports.success_login = function(req, res) {
    res.status(200).json({message: "Success! You're logged in."})
}

exports.failure_login = function(req, res) {
    res.status(401).send({message: 'Invalid password or user.'})
}

exports.log_out = function(req, res, next) {
    req.logout()
    res.status(200).json({message: 'Successfully logged out.'})
}