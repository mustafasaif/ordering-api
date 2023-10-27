const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const isNull = require("lodash/isNull");
const { createApiError } = require("../utils/apiError");
const { User } = db;

const login = async (userData) => {
  const { email, password } = userData;
  try {
    const userExists = await User.scope("withPassword").findOne({
      where: { email },
    });

    // if (isNull(userExists)) {
    //   throw createApiError(404, "This user does not exists");
    // }
    // const comparePassword = await bcrypt.compare(password, userExists.password);
    // if (!comparePassword) {
    //   throw createApiError(403, "Invalid password try again");
    // }

    if (
      isNull(userExists) ||
      !(await bcrypt.compare(password, userExists.password))
    ) {
      throw createApiError(400, "Invalid email or password try again");
    }

    return userExists;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = { login };
