const express = require("express");
const signup = require("./signup");

const router = express.Router();

module.exports = () => {
  router.use("/", signup());
  return router;
};
