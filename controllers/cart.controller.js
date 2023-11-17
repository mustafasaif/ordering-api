const Joi = require("joi");
const {
  addItemToCart,
  updateCartItem,
  getCartItems,
  deleteMultiCartItems,
} = require("../services/cart.service");

const createCartItems = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "any.required": "userId is required",
        "string.guid": "The userId must be UUIDv4",
        "string.base": "The UserId must be in string format",
        "string.empty": "UserId cannot be an empty field",
      }),
      productId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "any.required": "productId is required",
        "string.guid": "The productId must be UUIDv4",
        "string.base": "The productId must be in string format",
        "string.empty": "productId cannot be an empty field",
      }),
      quantity: Joi.number().required().messages({
        "any.required": "quantity is a required field",
        "string.number": `quantity should be a type of number`,
        "string.empty": `quantity cannot be an empty field`,
      }),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }

    const addedItem = await addItemToCart(value);

    res.status(201).json({
      success: true,
      message: "Post Operation completed successfully",
      data: addedItem,
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItems = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "any.required": "userId is required",
        "string.guid": "The userId must be UUIDv4",
        "string.base": "The UserId must be in string format",
        "string.empty": "UserId cannot be an empty field",
      }),
      productId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "any.required": "productId is required",
        "string.guid": "The productId must be UUIDv4",
        "string.base": "The productId must be in string format",
        "string.empty": "productId cannot be an empty field",
      }),
      quantity: Joi.number().required().messages({
        "any.required": "quantity is a required field",
        "string.number": `quantity should be a type of number`,
        "string.empty": `quantity cannot be an empty field`,
      }),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }

    const updatedItem = await updateCartItem(value);
    if (updatedItem[0] === 0) {
      return res.status(400).json({
        message: "patch Operation failed",
        error: "The provided item does not exist.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Patch Operation completed successfully",
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCartItems = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "any.required": "userId is required",
        "string.guid": "The userId must be UUIDv4",
        "string.base": "The UserId must be in string format",
        "string.empty": "UserId cannot be an empty field",
      }),
      productId: Joi.array()
        .items(Joi.string().guid({ version: "uuidv4" }).required())
        .min(1)
        .messages({
          "array.min":
            "The productId array must contain at least 1 valid UUIDv4 strings.",
          "array.base": "The productId field must be an array.",
          "string.guid": "The productId must be UUIDv4",
          "string.base": "The productId must be in string format",
          "any.required": "productId is a required field",
          "string.empty": "productId cannot be an empty field",
          "array.includesRequiredUnknowns": "productId cannot be empty array",
        }),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }

    const deletedItems = await deleteMultiCartItems(value);
    if (!deletedItems > 0) {
      return res.status(400).json({
        success: false,
        message: "Delete Operation failed",
        error: "The provided productIds do not exist.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Delete Operation completed successfully",
      data: deletedItems,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCartItems = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const cartItems = await getCartItems(userId);
    console.log(cartItems);

    res.status(200).json({
      success: true,
      message: "Get Operation successful",
      data: cartItems,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createCartItems,
  updateCartItems,
  getAllCartItems,
  deleteCartItems,
};
