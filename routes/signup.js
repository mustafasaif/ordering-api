const express = require("express");
const createUser = require("../controllers/signup.controller");
const signup = express.Router();

module.exports = () => {
 
  signup.post("/signup", createUser);
  return signup;
};
