const app = require("./app");

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
const HOST = process.env.HOST;

//server start
app.listen(PORT, () => {
  console.log(
    `App running in ${ENV} mode, listening at http://${HOST}:${PORT}`
  );
});

module.exports = app;
