const asyncHandler = require("../middleware/async");
const Carpart = require("../models/Carpart");
const Image = require("../models/Image");
const ErrorResponse = require("../utils/errorResponse");

exports.getCarparts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getCarpart = asyncHandler(async (req, res, next) => {
  const carpart = await Carpart.findById(req.params.id).populate();

  res.status(200).json({
    success: true,
    data: carpart,
  });
});

exports.createCarpart = asyncHandler(async (req, res, next) => {
  const carpart = await Carpart.create(req.body);

  if (carpart.image) {
    var img = {};
    if (carpart.image_text) {
      img.image_text = carpart.image_text;
    }
    img.url_reference = carpart.image;
    await Image.create(img);
  }
  res.status(200).json({
    success: true,
    data: carpart,
    message: "New car part has been added",
  });
});

exports.deleteCarpart = asyncHandler(async (req, res, next) => {
  const carpart = await Carpart.findByIdAndDelete(req.params.id);

  //if it can't find it, it's not an error that would break the server so we catch it separately
  if (!carpart) {
    return next(
      new ErrorResponse(`Couldn't find car part with ID: ${req.params.id}`, 404)
    );
  }

  //if the car part had an image, delete the the image that came with it from the database also.
  if (carpart.image) {
    const image = await Image.findOneAndDelete({
      url_reference: carpart.image,
    });
  }

  res.status(200).json({
    success: true,
    data: {},
    message: "Car part has been removed",
  });
});

exports.updateCarpart = asyncHandler(async (req, res, next) => {
  const carpart = await Carpart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  //if it can't find it, it's not an error that would break the server so we catch it separately
  if (!carpart) {
    return next(
      new ErrorResponse(`Couldn't find car part with ID: ${req.params.id}`, 404)
    );
  }

  return res.status(200).json({
    success: true,
    message: "Car part has been updated",
  });
});
