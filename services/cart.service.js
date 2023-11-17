const db = require("../models/index");
const { CartItem, Product, Sequelize } = db;
const { createApiError } = require("../utils/apiError");

const addItemToCart = async (cartData) => {
  console.log(cartData);
  try {
    const { userId, productId } = cartData;

    const itemExists = await CartItem.findOne({ where: { userId, productId } });
    if (itemExists) {
      throw createApiError(
        409,
        "Post Operation failed",
        "This item has already been added to the cart"
      );
    }
    const addedItem = await CartItem.create(cartData);
    return addedItem;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateCartItem = async (cartData) => {
  try {
    const { userId, productId, quantity } = cartData;

    const updatedItem = await CartItem.update(
      { quantity },
      { where: { userId, productId } }
    );

    return updatedItem;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteMultiCartItems = async (cartData) => {
  try {
    const { userId, productId } = cartData;

    const deletedItem = await CartItem.destroy({
      where: { userId, productId },
    });

    return deletedItem;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCartItems = async (userId) => {
  try {
    console.log({ userId });
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: {
            exclude: ["productQuantity", "createdAt", "updatedAt", "productId"],
          },
          on: {
            productId: Sequelize.col("CartItem.productId"),
          },
        },
      ],
      raw: true,
      nest: true,
      logging: true,
    });

    return cartItems;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  addItemToCart,
  updateCartItem,
  deleteMultiCartItems,
  getCartItems,
};
