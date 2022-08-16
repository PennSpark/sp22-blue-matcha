var mongoose = require('mongoose')
const { DateTime } = require('luxon')

var Schema = mongoose.Schema 

var formresponsesSchema = new Schema(
    {
        username: {type: String}, 
        form_number: {type: Number},
        responses: [{
            question: {type: String, required: true}, 
            type: {
                type: String, 
                required: true, 
                enum: ['MC', 'Short', 'Long']}, 
            options: [String], 
            form_number: {type: Number, required: true}, 
            selected: {type: Number}
        }]
    }
)

//export model 
module.exports = mongoose.model('FormResponses', formresponsesSchema) 