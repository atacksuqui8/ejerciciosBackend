"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(express.json());
const usersRouter = require("./routes/users-routes");
const apiRouter = require("./routes/api-routes");
const port = process.env.SERVER_PORT || 3080;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream })); //combined, es lo mismo pero te da mas información.
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/api", apiRouter);

app.all("*", (req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "NOT FOUND";
  next(err);
});
app.listen(port, () => console.log(`Listening  ${port}...`));
