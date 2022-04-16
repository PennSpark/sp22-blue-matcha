var mongoose = require("mongoose");

var Schema = mongoose.Schema; 

var quesSchema = new Schema(
    { 
        question: {type: String, required: true},
        answer: {type: String, required: true},
    }
);

//export model 
module.exports = mongoose.model('Question', quesSchema);