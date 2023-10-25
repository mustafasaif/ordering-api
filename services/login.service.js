const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const isNull = require("lodash/isNull");
const { createApiError } = require("../utils/apiError");
const { User } = db;
module.exports = loginUser = async (data) => {
  const { email, password } = data;
  try {
    const userExists = await User.findOne({ where: { email } });

    if (isNull(userExists)) {
      throw createApiError(400, "This user does not exists");
    }
    const comparePassword = await bcrypt.compare(password, userExists.password);
    if (comparePassword) return userExists;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
