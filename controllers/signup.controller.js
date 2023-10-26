const Joi = require("joi");
const registerNewUser = require("../services/signup.service");
const logger = require("../utils/logger");

module.exports = createUser = async (req, res, next) => {
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
          "any.required": "Password is a required field",
          "any.only": "Confirm Password does not match",
        }),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const newUser = await registerNewUser(value);

    res.status(200).json({ data: "User created successfully" });
    logger.info(`user ${newUser.firstName} created successfully`);
  } catch (error) {
    next(error);
  }
};
