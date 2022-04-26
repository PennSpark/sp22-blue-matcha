const mongoose = require("mongoose");
var Image = require("../models/image")
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  date: {type: Date, required: true},
  submitted_by: {type: String, required: true}, 
  facts: [String], 
  people: {type: String}, 
  photo: {type: Schema.Types.ObjectId, ref: "Image"}
});

module.exports = mongoose.model('Gallery', gallerySchema)