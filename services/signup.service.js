const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const { User } = db;
const isNull = require("lodash/isNull");
const { createApiError } = require("../utils/apiError");

const registerNewUser = async (userData) => {
  try {
    const { firstName, lastName, email, password, role } = userData;

    const existingUser = await User.findOne({ where: { email } });

    if (!isNull(existingUser)) {
      throw createApiError(
        409,
        "This account already exists. Please try a different email"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      userId: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    };

    const createdUser = await User.create(newUser);
    // .then((result) => {
    //   return result.get({ plain: true });
    // });

    // return createdUser.toJSON();
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerNewUser,
};
