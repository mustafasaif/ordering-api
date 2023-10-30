const { isNull } = require("lodash");
const { v4: uuidv4 } = require("uuid");
const db = require("../models/index");
const { createApiError } = require("../utils/apiError");
const { Branch, Sequelize } = db;

const getAllBranches = async (filterData) => {
  try {
    const { branchName, branchLocation, startDate, endDate, day } = filterData;
    let where = {};
    let currentDate;
    if (branchName) where.branchName = branchName;
    if (branchLocation) where.branchLocation = branchLocation;

    if (startDate) {
      if (!endDate) {
        where.createdAt = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
      } else {
        where.createdAt = {
          [Sequelize.Op.between]: [
            new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)),
            new Date(new Date(endDate).setUTCHours(23, 59, 59, 59)),
          ],
        };
      }
    }
    if (day) {
      switch (day) {
        case "today":
          currentDate = new Date();
          where.createdAt = {
            [Sequelize.Op.between]: [
              new Date(currentDate.setUTCHours(0, 0, 0, 0)),
              new Date(currentDate.setUTCHours(23, 59, 59, 59)),
            ],
          };

          break;
        case "week":
          currentDate = new Date();
          const startOfWeek = new Date();
          startOfWeek.setUTCHours(0, 0, 0, 0);
          startOfWeek.setDate(currentDate.getDate() - 7);
          const endOfWeek = new Date(currentDate.setUTCHours(23, 59, 59, 59));
          where.createdAt = {
            [Sequelize.Op.between]: [startOfWeek, endOfWeek],
          };

          break;
        case "month":
          currentDate = new Date();
          const startOfMonth = new Date();
          startOfMonth.setUTCHours(0, 0, 0, 0);
          startOfMonth.setMonth(currentDate.getMonth() - 1);
          const endOfMonth = new Date(currentDate.setUTCHours(23, 59, 59, 59));
          where.createdAt = {
            [Sequelize.Op.between]: [startOfMonth, endOfMonth],
          };
          break;

        default:
          currentDate = new Date();
          where.createdAt = {
            [Sequelize.Op.between]: [
              new Date(currentDate.setUTCHours(0, 0, 0, 0)),
              new Date(currentDate.setUTCHours(23, 59, 59, 59)),
            ],
          };
          break;
      }
    }

    const branches = await Branch.findAll({ where });
    return branches;
  } catch (error) {
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
