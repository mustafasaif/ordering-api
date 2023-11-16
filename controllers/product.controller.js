const {
  getAllProducts,
  deleteProductById,
  deleteProductsByIds,
  createProduct,
  updateProductById,
} = require("../services/product.service");
const Joi = require("joi");
const logger = require("../utils/logger");

const getAllProduct = async (req, res, next) => {
  try {
    const filterData = req.query;
    const products = await getAllProducts(filterData);
    res.status(200).json({
      success: true,
      message: "Get Operation completed successfully",
      data: products.rows,
      Total: products.count,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const schema = Joi.object({
      productId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.guid": "The productId must be UUIDv4",
        "string.base": "The productId must be in string format",
      }),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }
    const { productId } = value;
    const deletedCount = await deleteProductById(productId);
    if (deletedCount < 1) {
      return res.status(400).json({
        message: "Delete Operation failed",
        error: "The Product does not exist.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Delete Operation completed successfully.",
      data: deletedCount,
    });
    logger.info(`Product ${productId} deleted successfully`);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

//   ///BULD DELETE///
const bulkDeleteProduct = async (req, res, next) => {
  try {
    const schema = Joi.object({
      productIds: Joi.array()
        .items(Joi.string().guid({ version: "uuidv4" }).required())
        .min(2)
        .messages({
          "array.min":
            "The productId array must contain at least 2 valid UUIDv4 strings.",
          "array.base": "The productId field must be an array.",
          "string.guid": "The productId must be UUIDv4",
          "string.base": "The productId must be in string format",
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

    const deletedProductCount = await deleteProductsByIds(value.productIds);

    if (!deletedProductCount > 0) {
      return res.status(400).json({
        message: "Delete Operation failed",
        error: "The provided product Ids do not exist.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Delete operation completed successfully",
      data: deletedProductCount,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
///CREATE NEW BRANCH///
const createNewProduct = async (req, res, next) => {
  try {
    const schema = Joi.object({
      productName: Joi.string().required().messages({
        "any.required": "productName is a required field",
        "string.base": `productName should be a type of text`,
        "string.empty": `productName cannot be an empty field`,
      }),
      productType: Joi.string().required().messages({
        "any.required": "productType is a required field",
        "string.base": `productType should be a type of text`,
        "string.empty": `productType cannot be an empty field`,
      }),
      productSize: Joi.string().required().messages({
        "any.required": "productSize is a required field",
        "string.base": `productSize should be a type of text`,
        "string.empty": `productSize cannot be an empty field`,
      }),
      productPrice: Joi.number().required().messages({
        "any.required": "productPrice is a required field",
        "string.number": `productPrice should be a type of number`,
        "string.empty": `productPrice cannot be an empty field`,
      }),
      productQuantity: Joi.number().required().messages({
        "any.required": "productQuantity is a required field",
        "string.number": `productQuantity should be a type of number`,
        "string.empty": `productQuantity cannot be an empty field`,
      }),
      productId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.guid": "The productId must be UUIDv4",
        "string.base": "The productId must be in string format",
        "any.required": "productId is a required field",
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
    const newProduct = await createProduct(value);

    res.status(201).json({
      success: true,
      message: "Post Operation completed successfully.",
      data: newProduct,
    });
  } catch (error) {
    // logger.error(error);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      productId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.guid": "The productId must be UUIDv4",
        "string.base": "The productId must be in string format",
      }),
    });

    const { error: productIdError, value: productId } = paramsSchema.validate(
      req.params
    );

    if (productIdError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: productIdError.details[0].message,
      });
    }
    const schema = Joi.object({
      productName: Joi.string().messages({
        "string.base": `productName should be a type of text`,
        "string.empty": `productName cannot be an empty field`,
      }),
      productType: Joi.string().messages({
        "string.base": `productType should be a type of text`,
        "string.empty": `productType cannot be an empty field`,
      }),
      productSize: Joi.string().messages({
        "string.base": `productSize should be a type of text`,
        "string.empty": `productSize cannot be an empty field`,
      }),
      productPrice: Joi.number().messages({
        "string.number": `productPrice should be a type of number`,
        "string.empty": `productPrice cannot be an empty field`,
      }),
      productPrice: Joi.number().messages({
        "string.number": `productPrice should be a type of number`,
        "string.empty": `productPrice cannot be an empty field`,
      }),
    })
      .or(
        "productPrice",
        "productSize",
        "productType",
        "productName",
        "productQuantity"
      )
      .unknown(false);

    const { error, value: productData } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }

    if (req.user.role === "sales" || req.user.role === "user") {
      return res.status(400).json({
        success: false,
        message: "Post Operation failed",
        error:
          "You are not authorized perform this action. Kindly contact admin.",
      });
    }
    const updatedProduct = await updateProductById(
      productId.productId,
      productData
    );
    if (updatedProduct[0] === 0) {
      return res.status(400).json({
        message: "patch Operation failed",
        error: "The provided productId do not exist.",
      });
    }
    res.status(201).json({
      success: true,
      message: "Patch Operation completed successfully.",
      data: updatedProduct[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProduct,
  deleteProduct,
  bulkDeleteProduct,
  createNewProduct,
  updateProduct,
};
