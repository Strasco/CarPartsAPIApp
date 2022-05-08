const express = require("express");
const {
  getImages,
  getImage,
  updateImage,
  deleteImage,
  createImage,
} = require("../controllers/images");

const router = express.Router();

//if not destructured it gives error
const { validate } = require("../middleware/auth");

router.route("/").get(validate, getImages).post(validate, createImage);
router
  .route("/:id")
  .get(validate, getImage)
  .put(validate, updateImage)
  .delete(validate, deleteImage);

module.exports = router;
