"use strict";
const path = require("path");
const jsonUser = require("../database/users-json.json");
const fs = require("fs");
const { Console } = require("console");
const currentJsonPath = path.join(__dirname, "../database/users-json.json");

async function findUserByEmail(email) {
  return jsonUser.find((user) => user.email === email);
}

async function findUserById(id) {
  return jsonUser.find((user) => user.id === id);
}

async function registerUser(user) {
  user.userId = await findLastId();

  jsonUser.push(user);

  fs.writeFile(currentJsonPath, JSON.stringify(jsonUser, null, 2), (err) => {});
}

async function findLastId() {
  console.log("error", jsonUser.length);
  return jsonUser.length + 1;
}
module.exports = { findUserById, findUserByEmail, registerUser, findLastId };
