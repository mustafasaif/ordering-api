const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const { User } = db;
const isNull = require("lodash/isNull");
const { createApiError } = require("../utils/apiError");

module.exports = registerNewUser = async (data) => {
  try {
    const { firstName, lastName, email, password } = data;

    const userExists = await User.findOne({ where: { email } });

    if (!isNull(userExists)) {
      throw createApiError(
        409,
        "This account already exists. Please try a different email"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const userData = {
      userId: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const createdUser = await User.create(userData);
    // .then((result) => {
    //   return result.get({ plain: true });
    // });

    // return createdUser.toJSON();
    return createdUser;
  } catch (error) {
    throw error;
  }
};
