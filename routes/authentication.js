const express = require("express");
const { createUser } = require("../controllers/user.controller");
const { userLoginHandler } = require("../controllers/login.controller");
const {
  authenticationCheck,
  authorizationCheck,
} = require("../middlewares/auth");

const authentication = express.Router();

module.exports = () => {
  authentication.post("/register", createUser);
  authentication.post(
    "/register-admin",
    authenticationCheck,
    authorizationCheck("admin", "user"),
    createUser
  );
  authentication.post("/login", userLoginHandler);

  return authentication;
};
