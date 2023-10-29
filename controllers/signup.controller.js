const Joi = require("joi");
const { registerNewUser } = require("../services/signup.service");
const logger = require("../utils/logger");

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
      role: Joi.string(),
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

    if (req?.user?.role !== "admin" && userData.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Post Operation failed",
        error: "You are not authorized to create admin accounts",
      });
    }
    const newUser = await registerNewUser(userData);
    res.status(201).json({
      success: true,
      message: "Post Operation completed successfully.",
      data: newUser,
    });
    logger.info(`user ${newUser.firstName} created successfully`);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = {
  createUser,
};
