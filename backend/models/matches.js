const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  date: {type: Date, required: true},
  form_used: {type: Number},
  matches_generated: [
      {
        user: {type: String, required: true},
        received_match: {type: Boolean, required: true},
        matched_with: {type: String}
      }
  ],
  currently_on: {type: Boolean, required: true}
});

module.exports = mongoose.model('Matches', matchSchema); 