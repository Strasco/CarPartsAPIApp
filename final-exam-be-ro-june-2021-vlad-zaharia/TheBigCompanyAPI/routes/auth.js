const express = require("express");
const {
  register,
  login,
  getMe,
  incrementLoggedUsers,
  decrementLoggedUsers,
  getLoggedInUsers,
} = require("../controllers/auth");

const router = express.Router();
const { validate } = require("../middleware/auth");

router.post("/register", register); //login and register are the only ones that don't have protect
router.post("/login", login);
router.get("/me", validate, getMe).get("/loggedusers", getLoggedInUsers);
router.post("/incusers/", incrementLoggedUsers);
router.post("/decusers/", decrementLoggedUsers);

module.exports = router;
