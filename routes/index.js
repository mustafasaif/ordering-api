const express = require("express");
const authentication = require("./authentication");
const {
  getAllBranch,
  deleteBranch,
  bulkDeleteBranch,
  createNewBranch,
  updateBranch,
} = require("../controllers/branch.controller");
const {
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/user.controller");

const {
  authenticationCheck,
  authorizationCheck,
} = require("../middlewares/auth");

const router = express.Router();
module.exports = () => {
  router.use("/", authentication());

  ////////////////////////////////////////////////

  router.post(
    "/branches/create",
    authenticationCheck,
    authorizationCheck("admin"),
    createNewBranch
  );
  router.get("/branches/all", authenticationCheck, getAllBranch);

  router.delete(
    "/branches/delete/:branchId",
    authenticationCheck,
    authorizationCheck("admin"),
    deleteBranch
  );
  router.delete(
    "/branches/bulk-delete",
    authenticationCheck,
    authorizationCheck("admin"),
    bulkDeleteBranch
  );
  router.patch(
    "/branches/update/:branchId",
    authenticationCheck,
    authorizationCheck("admin", "branch_manager"),
    updateBranch
  );
  //////////////////////////////////////////////
  router.delete(
    "/users/delete:userId",
    authenticationCheck,
    authorizationCheck("admin"),
    deleteUser
  );

  router.get("/users/all", authenticationCheck, getUser);
  router.patch("/users/update/:userId", authenticationCheck, updateUser);

  return router;
};
