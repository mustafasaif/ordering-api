const express = require("express");
const authentication = require("./authentication");
const {
  getAllBranch,
  deleteBranch,
} = require("../controllers/branch.controller");
const {
  authenticationCheck,
  authorizationCheck,
} = require("../middlewares/auth");
const router = express.Router();

module.exports = () => {
  router.use("/", authentication());
  router.get("/all-branches", authenticationCheck, getAllBranch);
  router.delete(
    "/delete-branch/:branchId",
    authenticationCheck,
    authorizationCheck("admin"),
    deleteBranch
  );
  return router;
};
