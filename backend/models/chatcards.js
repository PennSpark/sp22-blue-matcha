var mongoose = require("mongoose");

var Schema = mongoose.Schema; 

var chatcardSchema = new Schema(
    {
        week: {type: Number, required: true}, 
        date: {type: Date},
        writer: {type: String, required: true}, 
        chatted: {type: String, required: true}, 
        response: {type: String, required: true},
        form: {type: Number, required: true}, 
        img: {
            data: Buffer,
            contentType: String
        }
    }
);

module.exports = mongoose.model('Chatcard', chatcardSchema); 