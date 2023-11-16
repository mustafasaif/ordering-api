const Joi = require("joi");
const { addItemToCart } = require("../services/cart.service");

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

module.exports = {
  createCartItems,
};
