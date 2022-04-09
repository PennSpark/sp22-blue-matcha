var User = require('../models/user'); 
var Login = require('../models/login');

createdAccount = (req) => {
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
