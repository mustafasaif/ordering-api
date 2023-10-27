const {
  fetchAllBranch,
  deleteSpecificBranch,
} = require("../services/branch.service");
const logger = require("../utils/logger");

const getAllBranch = async (req, res, next) => {
  try {
    const results = await fetchAllBranch();
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

const deleteBranch = async (req, res, next) => {
  try {
    const { branchId } = req.params;
    const results = await deleteSpecificBranch(branchId);
    if (results === 1) {
      res.status(200).json(results);
      logger.info(`Branch ${branchId} deleted successfully`);
    } else {
      res.status(400).json({ error: "The branch does not exists." });
      logger.error(`Branch ${branchId} does not exists`);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBranch,
  deleteBranch,
};
