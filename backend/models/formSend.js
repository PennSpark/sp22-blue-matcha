var mongoose = require('mongoose')

var Schema = mongoose.Schema 

var formsendSchema = new Schema(
    {
        question: {type: String, required: true}, 
        type: {
            type: String, 
            required: true, 
            enum: ['MC', 'Short', 'Long']}, 
        options: [String], 
        form_number: {type: Number, required: true}, 
        selected: {type: Number}
    }
)

module.exports = mongoose.model('FormSend', formsendSchema) 