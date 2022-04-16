var User = require('../models/user'); 
var Login = require('../models/login');
const { body,validationResult } = require('express-validator');


exports.created_account = (req) => {
    User.find({'userLogin': req.user.username})
    .exec(function (err, user_list) {
      if (err) { return next(err); }
      //Successful, so render
      if (user_list.length > 0) {
        return true;
      } else {
        return false;
      }
    });
}

exports.is_logged_in = function (req, res, done) {
    if (req.user) {
       return done();
    }
    return res.redirect("/login");
};

//get user form 
exports.get_create_user = function(req, res, next) {
    res.render('user');
}

/*figure it you want to santize the data later*/ 
exports.post_create_user = function(req, res, next) {
    User.find({'userLogin': req.user.username})
    .exec(function (err, user_list) {
      if (err) { return next(err); }
      //Successful, so render
      if (user_list.length > 0) {
        let err = new Error('User already created');
        err.status = 404;
        return next(err);
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
        res.redirect(user.url);
    });
}

exports.get_update_user = function (req, res, next) {
    let paramid = req.param.id;
    User.findOne({'userLogin': req.user.username})
    .exec(
        function (err, results) {
            if (err) {return next(err); }
            if (results==null) { // No results.
                var err = new Error('User doesn\'t have account.');
                err.status = 404;
                return next(err);
            }
            res.render('user', { title: 'Update Account', 
            first_name: results.first_name, 
            last_name: results.last_name, 
            year_of_grad: results.year_of_grad,
            email: results.email, update: true, 
            param_id: paramid,
            });
        }
    )
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
                    var err = new Error('User doesn\'t have account.');
                    err.status = 404;
                    return next(err);
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
                               res.redirect('/');
                            });
                    }  
            }
        )
        
    }
]

exports.get_delete_user = function (req, res, next) {
    res.render('delete_user');
}

//delete account if needed. 
exports.post_delete_user = function (req, res, next) {
    let user_name = req.user.username; 
    req.logout(); 
    Login.find({'username': user_name}).remove().exec(); 
    User.find({'userLogin': user_name}).remove().exec();
    res.redirect('/');
}

//view user information in dashboard 
exports.get_user_info = function(req, res, next) {
    //check whether or not the request is from the correct user 
    //const {user} = req.user;
    User.findById(req.params.id)
        .exec(function (err, result) {
            if (err) { return next(err); }
            if (result==null) { // No results.
                var err = new Error('User not found');
                err.status = 404;
                return next(err);
            }
            if (result.userLogin !== req.user.username) {
                //change to user url 
                res.render('index', {user: req.user, failure: false, userDetail: null});
            } else {
                res.render('index', {user: req.user, failure: false, userDetail: result});
            }
    });
}
