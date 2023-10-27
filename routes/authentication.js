const express = require("express");
const { createUser } = require("../controllers/signup.controller");
const { userLoginHandler } = require("../controllers/login.controller");

const authentication = express.Router();

module.exports = () => {
  authentication.post("/register", createUser);
  authentication.post("/login", userLoginHandler);

  return authentication;
};
