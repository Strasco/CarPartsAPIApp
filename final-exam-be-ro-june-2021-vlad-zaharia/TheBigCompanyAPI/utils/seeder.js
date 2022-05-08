const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Load env variables
dotenv.config({ path: "../config/config.env" });

const Carpart = require("../models/Carpart");
const User = require("../models/User");

//Connect to the db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const carparts = JSON.parse(
  fs.readFileSync(`../_data/_carparts.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`../_data/_users.json`, "utf-8"));

//Import into DB
const importData = async () => {
  try {
    await Carpart.create(carparts);
    await User.create(users);

    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
//delete data
const deleteData = async () => {
  try {
    await Carpart.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
