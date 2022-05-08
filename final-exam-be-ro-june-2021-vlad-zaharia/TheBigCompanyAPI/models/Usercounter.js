const mongoose = require("mongoose");

const Usercounter = new mongoose.Schema({
  count: {
    type: Number,
  },
});

module.exports = mongoose.model("Usercounter", Usercounter);
