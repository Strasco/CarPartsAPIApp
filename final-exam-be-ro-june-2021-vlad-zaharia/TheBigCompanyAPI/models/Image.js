const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url_reference: {
    type: String,
    required: [true, "Please add image URL"],
    unique: true,
  },
  image_text: {
    type: String,
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
