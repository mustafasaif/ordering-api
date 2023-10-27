const { isNull } = require("lodash");
const { v4: uuidv4 } = require("uuid");
const db = require("../models/index");
const { createApiError } = require("../utils/apiError");
const { Branch } = db;

const getAllBranches = async () => {
  try {
    const branches = await Branch.findAll();
    return branches;
  } catch (error) {
    // console.log(error);
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
      throw createApiError(409, "This branch already exists.");
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
module.exports = {
  getAllBranches,
  deleteBranchById,
  deleteBranchesByIds,
  createBranch,
};
