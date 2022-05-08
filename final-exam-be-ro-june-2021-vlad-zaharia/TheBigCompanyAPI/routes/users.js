const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

//if not destructured it gives error
const { validate } = require("../middleware/auth");

router.route("/").get(validate, getUsers);
router
  .route("/:id")
  .get(validate, getUser)
  .put(validate, updateUser)
  .delete(validate, deleteUser);

module.exports = router;
