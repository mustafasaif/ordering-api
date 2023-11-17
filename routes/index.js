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
  createCartItems,
  updateCartItems,
  deleteCartItems,
  getAllCartItems,
} = require("../controllers/cart.controller");
const {
  authenticationCheck,
  authorizationCheck,
} = require("../middlewares/auth");

const router = express.Router();
module.exports = () => {
  router.use("/", authentication());

  ////////////////Branch Routes////////////////////////////////
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
  ////////////////User Routes//////////////////////////////
  router.delete(
    "/users/delete:userId",
    authenticationCheck,
    authorizationCheck("admin"),
    deleteUser
  );

  router.get("/users/all", authenticationCheck, getUser);
  router.patch("/users/update/:userId", authenticationCheck, updateUser);

  ////////////////Product Routes//////////////////////////
  router.post(
    "/products/create",
    authenticationCheck,
    authorizationCheck("branch_manager", "admin"),
    createNewProduct
  );
  router.patch(
    "/products/update/:productId",
    authenticationCheck,
    authorizationCheck("branch_manager", "admin"),
    updateProduct
  );
  router.delete(
    "/products/delete/:productId",
    authenticationCheck,
    authorizationCheck("branch_manager", "admin"),
    deleteProduct
  );
  router.delete(
    "/products/bulk-delete",
    authenticationCheck,
    authorizationCheck("admin", "branch_manager"),
    bulkDeleteProduct
  );
  router.get("/products/all", authenticationCheck, getAllProduct);

  //////////////////Cart Routes//////////////////////////////////////
  router.post("/cart/add", authenticationCheck, createCartItems);
  router.patch("/cart/update", authenticationCheck, updateCartItems);
  router.delete("/cart/delete", authenticationCheck, deleteCartItems);
  router.get("/cart/all", authenticationCheck, getAllCartItems);
  return router;
};
