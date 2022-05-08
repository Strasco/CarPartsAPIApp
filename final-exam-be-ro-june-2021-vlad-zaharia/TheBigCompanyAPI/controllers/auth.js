const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Usercounter = require("../models/Usercounter");
const logger = require("../utils/logger");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  //Create token
  sendTokenResponse(user, 200, res);
});

exports.incrementLoggedUsers = asyncHandler(async (req, res, next) => {
  var counter = await Usercounter.find({});
  if (counter[0] === undefined) {
    counter = await Usercounter.create({ count: 1 });
  }
  logger.info(counter[0].count);
  var newcounter = await Usercounter.findByIdAndUpdate(counter[0]._id, {
    count: counter[0].count + 1,
  });

  res.status(200).json({ currentCount: newcounter });
});

exports.decrementLoggedUsers = asyncHandler(async (req, res, next) => {
  var counter = await Usercounter.find({});
  if (counter[0] === undefined) {
    counter = await Usercounter.create({ count: 1 });
  }

  var newcounter = await Usercounter.findByIdAndUpdate(counter[0]._id, {
    count: counter[0].count - 1,
  });

  res.status(200).json({ currentCount: newcounter });
});

exports.getLoggedInUsers = asyncHandler(async (req, res, next) => {
  const counter = await Usercounter.find({});

  res.status(200).json({ counter: counter[0].count });
});

exports.createCounter = asyncHandler(async (req, res, next) => {
  res.status(200).json({ data: counter });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email and password(credentials)
  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email and passsword"),
      400
    );
  }

  //Check for user
  const user = await User.findOne({ email }).select("+password"); //this includes the password when we find a user.

  if (!user) {
    return next(new ErrorResponse("Invalid credentials"), 401);
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials"), 401);
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token: token,
  });
};

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
