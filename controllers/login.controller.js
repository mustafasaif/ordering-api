const Joi = require("joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const loginUser = require("../services/login.service");
const logger = require("../utils/logger");

dotenv.config();

const userLogin = async (req, res, next) => {
  try {
    const schema = Joi.object({
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
    })
      .options({ allowUnknown: false })
      .messages({
        "object.unknown": "Please provide the required fields only.",
      });
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const loggedUser = await loginUser(value);

    const { userId, firstName, lastName } = loggedUser;

    const token = jwt.sign(
      { userId, firstName, lastName },
      `${process.env.SECRET}`,
      {
        expiresIn: `${process.env.LOGIN_EXPIRE}`,
      }
    );

    res.status(200).json({ token });
    logger.info(`User ${userId} logged in successfully`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
};
