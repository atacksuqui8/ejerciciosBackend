"use strict";

const express = require("express");

const { addUser } = require("../controllers/user/register-user");
const { loginUser } = require("../controllers/user/login-user");
const router = express.Router();
router.route("/login").post((req, res) => loginUser(req, res));
router.route("/register").post((req, res) => addUser(req, res));

module.exports = router;
