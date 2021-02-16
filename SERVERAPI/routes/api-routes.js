"use strict";

const express = require("express");
const { validateAuth } = require("../middlewares/validate-auth");
const { getDataApi } = require("../controllers/api/exploit-api");
const router = express.Router();

router
  .route("/:paramApi")
  .all(validateAuth)
  .get((req, res) => {
    getDataApi(req, res);
  });
module.exports = router;
