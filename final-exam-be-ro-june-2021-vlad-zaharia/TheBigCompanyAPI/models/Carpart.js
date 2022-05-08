const mongoose = require("mongoose");

const CarpartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add car part name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a car part description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Brakes",
      "Engine Parts",
      "Suspension and steering",
      "transmission",
      "body and exhaust",
      "electrical and lighting",
    ],
  },
  image: {
    type: String,
    ref: "Image",
  },
  image_text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CarpartSchema.pre("remove", async function (next) {
  console.log(`image being removed from Carpart ${this._id}`);
  await this.model("Image").deleteOne({ url_reference: this.image });
  next();
});

module.exports = mongoose.model("Carpart", CarpartSchema);
