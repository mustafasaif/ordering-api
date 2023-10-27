const express = require("express");
const { createUser } = require("../controllers/signup.controller");
const { userLogin } = require("../controllers/login.controller");

const authentication = express.Router();

module.exports = () => {
  authentication.post("/register", createUser);
  authentication.post("/login", userLogin);

  return authentication;
};
