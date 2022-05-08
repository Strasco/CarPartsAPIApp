const express = require("express");
const {
  getCarparts,
  getCarpart,
  createCarpart,
  deleteCarpart,
  updateCarpart,
} = require("../controllers/carparts");
const advancedResult = require("../middleware/advancedResult");
const Carpart = require("../models/Carpart");

const router = express.Router();

//if not destructured it gives error
const { validate } = require("../middleware/auth");

router
  .route("/")
  .get(validate, advancedResult(Carpart), getCarparts)
  .post(validate, createCarpart);
router
  .route("/:id")
  .get(validate, getCarpart)
  .put(validate, updateCarpart)
  .delete(validate, deleteCarpart);

module.exports = router;
