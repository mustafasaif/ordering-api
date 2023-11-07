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
  createNewProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProduct,
  getAllProduct,
} = require("../controllers/product.controller");
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

  //////////////////////////////////////////
  router.post("/products/create", authenticationCheck, createNewProduct);
  router.patch(
    "/products/update/:productId",
    authenticationCheck,
    updateProduct
  );
  router.delete(
    "/products/delete/:productId",
    authenticationCheck,
    deleteProduct
  );
  router.delete(
    "/products/bulk-delete",
    authenticationCheck,
    authorizationCheck("admin", "branch_manager"),
    bulkDeleteProduct
  );
  router.get(
    "/products/all",
    authenticationCheck,
    authorizationCheck("admin", "branch_manager", "user"),
    getAllProduct
  );
  return router;
};
