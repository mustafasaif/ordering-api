const {
  getAllBranches,
  deleteBranchById,
  deleteBranchesByIds,
  createBranch,
  updateBranchById,
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
      data: branches.rows,
      Total: branches.count,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const deleteBranch = async (req, res, next) => {
  try {
    const schema = Joi.object({
      branchId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.guid": "The branchId must be UUIDv4",
        "string.base": "The branchId must be in string format",
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
    const { branchId } = value;
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
        success: false,
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

const updateBranch = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      branchId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.guid": "The branchId must be UUIDv4",
        "string.base": "The branchId must be in string format",
      }),
    });

    const { error: branchIdError, value: branchId } = paramsSchema.validate(
      req.params
    );

    if (branchIdError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: branchIdError.details[0].message,
      });
    }
    const schema = Joi.object({
      branchName: Joi.string(),
      branchLocation: Joi.string(),
    })
      .or("branchName", "branchLocation")
      .unknown(false);

    const { error, value: branchData } = schema.validate(req.body);
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
    const updatedBranch = await updateBranchById(branchId.branchId, branchData);
    if (updatedBranch[0] === 0) {
      return res.status(400).json({
        message: "patch Operation failed",
        error: "The provided branch Id do not exist.",
      });
    }
    res.status(201).json({
      success: true,
      message: "Patch Operation completed successfully.",
      data: updatedBranch[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBranch,
  deleteBranch,
  bulkDeleteBranch,
  createNewBranch,
  updateBranch,
};
