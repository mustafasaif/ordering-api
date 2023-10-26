const express = require("express");
const authentication = require("./authentication");
const getAllBranch = require("../controllers/branch.controller");
const authCheck = require("../middlewares/auth");
const router = express.Router();

module.exports = () => {
  router.use("/", authentication());
  router.get("/all-branches", authCheck, getAllBranch);
  return router;
};
