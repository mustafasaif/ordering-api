const db = require("../models/index");
const { CartItem } = db;
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

module.exports = { addItemToCart };
