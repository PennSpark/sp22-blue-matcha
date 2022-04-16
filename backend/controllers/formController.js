var User = require('../models/user');
const { body,validationResult } = require('express-validator');

//get user form 
exports.post_matching_form = function(req, res, next) {
    res.json(req.body); 
    res.send("currently updating.")
    //res.render('user');
}