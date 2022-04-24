const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  date: {type: Date, required: true},
  submitted_by: {type: String, required: true}, 
  chatted_with: {type: String, required: true},
  matching_id: {type: String},
  chat_card:
      {
        chat_color: {type: String},
        activity: {type: String, required: true},
        facts: [String]
      },
});

module.exports = mongoose.model('Gallery', gallerySchema)