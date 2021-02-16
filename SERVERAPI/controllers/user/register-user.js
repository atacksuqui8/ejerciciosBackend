"use strict";
const {
  registerUser,
  findUserByEmail,
} = require("../../repositories/users-repository");
const bcrypt = require("bcryptjs");

async function addUser(req, res) {
  try {
    const { userName, password, email } = req.body;
    const passwordHash = await bcrypt.hash(password, 2);

    const user = {
      userName,
      passwordHash,
      email,
    };
    const userFound = await findUserByEmail(user.email);

    if (userFound !== undefined) {
      console.log("No se puede añadir ya que ya existe ese usuario");
      const error = new Error(
        " No se puede añadir ya que ya existe ese usuario"
      );
      error.status = 409;
      throw error;
    }
    await registerUser(user);
    res.status(201).send({ accept: true });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { addUser };
