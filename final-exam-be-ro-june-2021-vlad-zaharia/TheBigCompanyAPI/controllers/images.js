const asyncHandler = require("../middleware/async");
const Image = require("../models/Image");
const ErrorResponse = require("../utils/errorResponse");
const redis = require("redis");

exports.getImages = asyncHandler(async (req, res, next) => {
  const images = await Image.find();

  res.status(200).json({
    success: true,
    count: images.length,
    data: images,
  });
});

exports.getImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: image,
  });
});

exports.createImage = asyncHandler(async (req, res, next) => {
  setAsync(req.body.carpartID, req.body.url_reference).catch(() => {
    //err
  });
  const url_reference = getAsync(req.params.carpartID).catch(() => {
    //err
  });
  const image = await Image.create(req.body);
  res.status(200).json({
    success: true,
    message: "Image saved to redis and mongodb",
    image: image,
    url_reference: url_reference,
  });
});

const setAsync = (key, value) => {
  const client = redis.createClient();
  return new Promise((resolve, reject) => {
    client.set(key, value, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

const getAsync = (key) => {
  const client = redis.createClient();
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        return reject(err);
      }
      return resolve(reply);
    });
  });
};

exports.deleteImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findByIdAndDelete(req.params.id);

  if (!image) {
    return next(
      new ErrorResponse(`Couldn't find image with ID: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
    message: "Image has been removed",
  });
});

exports.updateImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!image) {
    return next(
      new ErrorResponse(`Couldn't find image with ID: ${req.params.id}`, 404)
    );
  }

  return res.status(200).json({
    success: true,
    message: "Image has been updated",
  });
});
