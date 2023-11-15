const Joi = require("joi");
const {
  registerNewUser,
  deleteUserById,
  getAllUsers,
  updateUserbyId,
} = require("../services/user.service");
const logger = require("../utils/logger");
const isNull = require("lodash/isNull");

const createUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().required("first name is required").messages({
        "any.required": "first name is a required field",
        "string.base": `first name should be a type of text`,
        "string.empty": `first name cannot be an empty field`,
      }),
      lastName: Joi.string().required().messages({
        "any.required": "Last name is a required field",
        "string.base": `Last name should be a type of text`,
        "string.empty": `Last name cannot be an empty field`,
      }),
      email: Joi.string().email().required().messages({
        "any.required": "Email is a required field",
        "string.base": `Email should be a type of text`,
        "string.empty": `Email cannot be an empty field`,
        "string.email": `Email provided is not valid`,
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is a required field",
        "string.empty": `Password cannot be an empty field`,
      }),
      confirmPassword: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .messages({
          "any.required": "Confirm Password is a required field",
          "any.only": "Confirm Password does not match",
        }),
      role: Joi.string()
        .valid("admin", "user", "sales", "branch_manager")
        .required()
        .messages({
          "any.required": "Role is a required field",
          "any.only": "Invalid role specified",
        }),
      branchId: Joi.when("role", {
        is: Joi.valid("sales", "branch_manager"),
        then: Joi.string().guid({ version: "uuidv4" }).required().messages({
          "any.required": "Branch ID is required for sales and branch managers",
          "string.base": "Branch ID should be a type of text",
          "string.empty": "Branch ID cannot be an empty field",
          "string.guid": "The branchId must be UUIDv4",
        }),
        otherwise: Joi.optional(),
      }),
    })
      .options({ allowUnknown: false })
      .messages({
        "object.unknown": "Please provide the required fields only.",
      });
    const { error, value: userData } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }

    switch (true) {
      case !req?.user && userData.role !== "user":
        return res.status(400).json({
          success: false,
          message: "Post Operation failed",
          error:
            "This route only allows accounts will the role 'user' to be created.",
        });
      case req?.user?.role !== "admin" && userData.role === "admin":
        return res.status(400).json({
          success: false,
          message: "Post Operation failed",
          error: "You are not authorized to create admin accounts",
        });

      case req.user.role === "admin" &&
        (userData.role === "sales" || userData.role === "branch_manager") &&
        isNull(userData.branchId):
        return res.status(400).json({
          success: false,
          message: "Post Operation failed",
          error: "You need to provide branchId for Managers and sales",
        });

      case req.user.role === "branch_manager" &&
        userData.role === "branch_manager":
        return res.status(400).json({
          success: false,
          message: "Post Operation failed",
          error: "Branch managers cannot create other branch managers",
        });

      case req.user.role === "branch_manager" &&
        userData.role === "sales" &&
        isNull(userData.branchId):
        return res.status(400).json({
          success: false,
          message: "Post Operation failed",
          error: "Please provide branchId for the user",
        });

      default:
        // If none of the conditions match, create a new user
        const newUser = await registerNewUser(userData);
        res.status(201).json({
          success: true,
          message: "Post Operation completed successfully.",
          data: newUser,
        });
        logger.info(`user ${newUser.firstName} created successfully`);
    }
  } catch (error) {
    console.log(error);
    logger.error(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.guid": "The user Id must be UUIDv4",
        "string.base": "The user Id must be in string format",
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
    const { userId } = value;
    const deletedCount = await deleteUserById(userId);
    if (deletedCount < 1) {
      return res.status(400).json({
        message: "Delete Operation failed",
        error: "The user does not exist.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Delete Operation completed successfully.",
      data: deletedCount,
    });
    logger.info(`User ${userId} deleted successfully`);
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const filterData = {
      ...req.query,
      role: req.user.role,
      branchId: req.user.branchId,
    };
    const users = await getAllUsers(filterData);
    res.status(200).json({
      success: true,
      message: "Get Operation completed successfully",
      data: users.rows,
      Total: users.count,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      userId: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "string.guid": "The userId must be UUIDv4",
        "string.base": "The userId must be in string format",
      }),
    });

    const { error: userIdError, value: userId } = paramsSchema.validate(
      req.params
    );

    if (userIdError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: userIdError.details[0].message,
      });
    }
    const schema = Joi.object({
      firstName: Joi.string(),
      email: Joi.string(),
      lastName: Joi.string(),
    })
      .or("firstName", "email", "lastName")
      .unknown(false);

    const { error, value: userData } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }
    if (req.user.role === "sales" && userId !== req.user.userId) {
      return res.status(409).json({
        success: false,
        message: "patch Operation failed",
        error: "You are only allowed to update your profile.",
      });
    }

    const updatedUser = await updateUserbyId(userId.userId, userData);
    if (updatedUser[0] === 0) {
      return res.status(400).json({
        message: "patch Operation failed",
        error: "The provided user Id do not exist.",
      });
    }
    res.status(201).json({
      success: true,
      message: "Patch Operation completed successfully.",
      data: updatedUser[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  updateUser,
};
