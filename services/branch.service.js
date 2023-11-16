const { isNull } = require("lodash");
const { v4: uuidv4 } = require("uuid");
const db = require("../models/index");
const { createApiError } = require("../utils/apiError");
const {
  removeDuplicateBranches,
  dateRangeFilter,
} = require("../utils/commonFunctions");
const { Branch, User, Sequelize } = db;

const getAllBranches = async (filterData) => {
  try {
    const {
      branchName,
      branchLocation,
      startDate,
      endDate,
      day,
      q,
      limit,
      branchId,
      getUsers,
    } = filterData;
    let options = { where: {}, limit };

    if (branchName) options.where.branchName = branchName;
    if (branchLocation) options.where.branchLocation = branchLocation;
    dateRangeFilter({ options, startDate, endDate, day, Sequelize });

    if (q) {
      options.where[Sequelize.Op.or] = [
        { branchName: { [Sequelize.Op.like]: `%${q}%` } },
        { branchLocation: { [Sequelize.Op.like]: `%${q}%` } },
      ];
    }

    if (branchId) {
      options.where.branchId = branchId;
    }
    if (getUsers) {
      options.raw = true;
      options.nest = true;
      options.include = [
        {
          model: User,
          // as: "users",
        },
      ];
    }

    options.limit = parseInt(limit) || 50;

    let results = {};
    const { rows, count } = await Branch.findAndCountAll(options);
    console.log(rows);
    console.log(count);

    if (getUsers) {
      // const branches = await removeDuplicateBranches(rows, "branchId");
      // results.rows = branches;
      results.rows = rows;
    } else {
      results.rows = rows;
    }
    results.count = count;
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteBranchById = async (branchId) => {
  try {
    const deletedCount = await Branch.destroy({ where: { branchId } });
    return deletedCount;
  } catch (error) {
    throw error;
  }
};

const deleteBranchesByIds = async (branchIds) => {
  try {
    const deletedCount = await Branch.destroy({
      where: { branchId: branchIds },
    });

    return deletedCount;
  } catch (error) {
    throw error;
  }
};

const createBranch = async (data) => {
  try {
    const { branchName, branchLocation } = data;
    const existingBranch = await Branch.findOne({
      where: { branchName, branchLocation },
    });

    if (!isNull(existingBranch)) {
      throw createApiError(
        409,
        "Post Operation failed",
        "This branch already exists."
      );
    }

    const branchData = {
      ...data,
      branchId: uuidv4(),
    };

    const createdBranch = await Branch.create(branchData);
    return createdBranch;
  } catch (error) {
    throw error;
  }
};

const updateBranchById = async (branchId, branchData) => {
  try {
    const updatedBranch = await Branch.update(
      { ...branchData },
      { where: { branchId } }
    );
    return updatedBranch;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllBranches,
  deleteBranchById,
  deleteBranchesByIds,
  createBranch,
  updateBranchById,
};
