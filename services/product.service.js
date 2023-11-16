// const { v4: uuidv4 } = require("uuid");
const { dateRangeFilter } = require("../utils/commonFunctions");
const { isNull } = require("lodash");
const db = require("../models/index");
const { createApiError } = require("../utils/apiError");
const { Product, User, Sequelize } = db;
const createProduct = async (data) => {
  try {
    // const productId = uuidv4();
    const { productId } = data;
    const existingProduct = await Product.findOne({
      where: { productId },
    });

    if (!isNull(existingProduct)) {
      throw createApiError(
        409,
        "Post Operation failed",
        "This Product already exists."
      );
    }

    // const productData = {
    //   ...data,
    //   productId,
    // };

    const createdProduct = await Product.create(data);
    return createdProduct;
  } catch (error) {
    throw error;
  }
};

const updateProductById = async (productId, productData) => {
  try {
    const updatedProduct = await Product.update(
      { ...productData },
      { where: { productId } }
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProductById = async (productId) => {
  try {
    const deletedCount = await Product.destroy({ where: { productId } });
    return deletedCount;
  } catch (error) {
    throw error;
  }
};

const deleteProductsByIds = async (productIds) => {
  try {
    const deletedCount = await Product.destroy({
      where: { productId: productIds },
    });

    return deletedCount;
  } catch (error) {
    throw error;
  }
};

const getAllProducts = async (filterData) => {
  try {
    const {
      productName,
      productType,
      productSize,
      productPrice,
      startDate,
      endDate,
      day,
      q,
      limit,
      productId,
    } = filterData;
    let options = { where: {}, limit };

    if (productName) options.where.productName = productName;
    if (productType) options.where.productType = productType;
    if (productSize) options.where.productSize = productSize;
    if (productPrice) options.where.productPrice = productPrice;
    dateRangeFilter({ options, startDate, endDate, day, Sequelize });

    if (q) {
      options.where[Sequelize.Op.or] = [
        { productName: { [Sequelize.Op.like]: `%${q}%` } },
        { productSize: { [Sequelize.Op.like]: `%${q}%` } },
        { productType: { [Sequelize.Op.like]: `%${q}%` } },
        { productPrice: { [Sequelize.Op.like]: `%${q}%` } },
      ];
    }

    if (productId) {
      options.where.productId = productId;
    }

    options.limit = parseInt(limit) || 50;

    const results = await Product.findAndCountAll(options);

    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createProduct,
  updateProductById,
  deleteProductById,
  deleteProductsByIds,
  getAllProducts,
};
