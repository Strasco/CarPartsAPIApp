const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//users will only be created from the authentication middleware
// exports.createUser = asyncHandler(async (req, res, next) => {
//   const user = User.create(req.params.body);

//   res.status(200).json({
//     success: true,
//     data: "returning one user based on ID",
//   });
// });

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await Image.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorResponse(`Couldn't find user with ID: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`Couldn't find user with ID: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
