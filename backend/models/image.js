const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ImageSchema = new Schema(
    {
        userLogin: { type: String,},
        image_url: {
        type: String,
        },
        cloudinary_id: {
        type: String,
        }
    }
)

module.exports = mongoose.model('Image', ImageSchema)