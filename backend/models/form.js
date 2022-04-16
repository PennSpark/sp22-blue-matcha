var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema; 


var formSchema = new Schema(
    {
        userLogin: {type: String, required: true, 
        maxLength: 100}, 
        date_filled_form: {type: Date, required: true}, 
        date_form_created: {type: Date, required: true}, 
        responses: [answerSchema]
    }
);

userSchema.virtual('clean_filled_form').get(function() {
    return DateTime.fromJSDate(this.date_filled_form).toLocaleString(DateTime.DATE_MED);
});

//export model 
module.exports = mongoose.model('Form', formSchema); 