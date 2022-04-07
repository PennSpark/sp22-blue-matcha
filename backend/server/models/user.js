var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema; 

var userSchema = new Schema(
    {
        first_name: {type: String, required: true, 
        maxLength: 100}, 
        last_name: {type: String, required: true, 
        maxLength: 100}, 
        year_of_grad: {type: Number, required: true, min: 2000, max: 2050}, 
        email: {type: String, required: true, minLength: 1}, 
        date_created_account: {type: Date}, 
        userLogin: {type: String, required: true}
    }
);

userSchema.virtual('clean_date_created').get(function() {
    return DateTime.fromJSDate(this.date_created_account).toLocaleString(DateTime.DATE_MED);
});

//virtual for author's URL 
userSchema.virtual('url').get(function() {
    return '/user/' + this._id;
});

//export model 
module.exports = mongoose.model('User', userSchema); 