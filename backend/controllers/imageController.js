const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")
const Image = require("../models/image")

// File Upload 

exports.post_upload_image = [upload.single('image'), async (req, res, next) => {
    try {
        // Upload image to cloudinary
        var imageFile = req.file
        if (!imageFile) {
            req.uploaded_image = false
            return next()
          }
        const result = await cloudinary.uploader.upload(imageFile.path);
         // Create new user
        let image = new Image({
          userLogin: req.user.username,
          image_url: result.secure_url,
          cloudinary_id: result.public_id,
        });
        // Save image
        await image.save()
        req.uploaded_image = true 
        req.stored_image = image
        next()
      } catch (err) {
        console.log(err)
        next(err)
      } 
}]

exports.get_picture = async (req, res, next) => {
    try {
        let image = await Image.findById(req.picture_id)
        if (image) {
            req.image_url = image.image_url
        }
        next()
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.get_all_images = async (req, res, next) => {
    try {
        let image = await Image.find();
        res.json(image)
    } catch (err) {
        console.log(err)
    }
}

exports.delete_image = async (req, res, next) => {
    try {
        // Find user by id
        if (req.picture_id) {
            let image = await Image.findById(req.picture_id)
            await cloudinary.uploader.destroy(image.cloudinary_id);
            // Delete user from db
            await image.remove();
        }
        next()
      } catch (err) {
        console.log(err);
        next (err)
      }
}
