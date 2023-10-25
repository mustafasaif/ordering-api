const Joi = require("joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const loginUser = require("../services/login.service");

dotenv.config();

module.exports = userLogin = async (req, res, next) => {
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
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const loggedUser = await loginUser(value);
    console.log(`${process.env.LOGIN_EXPIRE}`);

    const { userId, firstName, lastName } = loggedUser;
    const token = jwt.sign(
      { userId, firstName, lastName },
      `${process.env.SECRET}`,
      {
        expiresIn: `${process.env.LOGIN_EXPIRE}`,
      }
    );

    res.json({ token, data: loggedUser });
  } catch (error) {
    next(error);
  }
};
