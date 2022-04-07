const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  username: String,
  password: String
});

loginSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Login', loginSchema); 