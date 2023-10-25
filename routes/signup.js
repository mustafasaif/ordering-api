const express = require("express");
const createUser = require("../controllers/signup.controller");
const userLogin = require("../controllers/login.controller");
const signup = express.Router();

module.exports = () => {
  signup.post("/signup", createUser);
  signup.post("/login", userLogin);
  return signup;
};
