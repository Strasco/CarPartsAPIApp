const express = require("express");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });
const winston = require("winston");

//route files
const images = require("./routes/images");
const carparts = require("./routes/carparts");
const users = require("./routes/users");
const auth = require("./routes/auth");

//express server object
const app = express();

//connect database
connectDB();

//Development logging
app.use(morgan("dev"));

//body-parser
app.use(express.json());

//cors policy
app.use(cors());

//mount routers
app.use("/api/images", images);
app.use("/api/carparts", carparts);
app.use("/api/users", users);
app.use("/api/auth", auth);

//error middleware
app.use(errorHandler);

//exporting
module.exports = app;
