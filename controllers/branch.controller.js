const {
  getAllBranches,
  deleteBranchById,
  deleteBranchesByIds,
  createBranch,
} = require("../services/branch.service");
const Joi = require("joi");
const logger = require("../utils/logger");

const getAllBranch = async (req, res, next) => {
  try {
    const filterData = req.query;
    const branches = await getAllBranches(filterData);
    res.status(200).json({
      success: true,
      message: "Get Operation completed successfully",
      data: branches,
      Total: branches.length,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const deleteBranch = async (req, res, next) => {
  try {
    const { branchId } = req.params;
    const deletedCount = await deleteBranchById(branchId);
    if (deletedCount < 1) {
      return res.status(400).json({
        message: "Delete Operation failed",
        error: "The branch does not exist.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Delete Operation completed successfully.",
      data: deletedCount,
    });
    logger.info(`Branch ${branchId} deleted successfully`);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

///BULD DELETE///
const bulkDeleteBranch = async (req, res, next) => {
  try {
    const schema = Joi.object({
      branchIds: Joi.array()
        .items(Joi.string().guid({ version: "uuidv4" }).required())
        .min(2)
        .messages({
          "array.min":
            "The branchIds array must contain at least 2 valid UUIDv4 strings.",
          "array.base": "The branchIds field must be an array.",
          "string.guid": "The branchIds must be UUIDv4",
          "string.base": "The branchIds must be in string format",
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

    const deletedBranchCount = await deleteBranchesByIds(value.branchIds);

    if (!deletedBranchCount > 0) {
      return res.status(400).json({
        message: "Delete Operation failed",
        error: "The provided branch Ids do not exist.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Delete operation completed successfully",
      data: deletedBranchCount,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
///CREATE NEW BRANCH///
const createNewBranch = async (req, res, next) => {
  try {
    const schema = Joi.object({
      branchName: Joi.string().required().messages({
        "any.required": "Branch Name is a required field",
        "string.base": `Branch Name should be a type of text`,
        "string.empty": `Branch Name cannot be an empty field`,
      }),
      branchLocation: Joi.string().required().messages({
        "any.required": "Branch Location is a required field",
        "string.base": `Branch Location should be a type of text`,
        "string.empty": `Branch Location cannot be an empty field`,
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
    const newBranch = await createBranch(value);

    res.status(201).json({
      success: true,
      message: "Post Operation completed successfully.",
      data: newBranch,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = {
  getAllBranch,
  deleteBranch,
  bulkDeleteBranch,
  createNewBranch,
};
