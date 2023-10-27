const jwt = require("jsonwebtoken");
const { createApiError } = require("../utils/apiError");
const util = require("util");
const db = require("../models/index");
const isNull = require("lodash/isNull");
const { User } = db;
const authenticationCheck = async (req, res, next) => {
  try {
    //1.check if token exists

    const testToken = req.headers.authorization;

    let token;
    if (testToken && testToken.startsWith("Bearer")) {
      token = testToken.split(" ")[1];
    }

    if (!token) {
      throw createApiError(401, "Bearer token missing in authorization headers");
    }

    const decodedToken = await util.promisify(jwt.verify)(
      token,
      process.env.SECRET
    );

    const user = await User.findOne({
      where: { userId: decodedToken.userId },
    });
    if (!user) {
      throw createApiError(401, "The user with the given token does not exist");
    }

    if (!isNull(user.passwordUpdatedAt)) {
      const updatedAtTimestamp = parseInt(
        user.passwordUpdatedAt.getTime() / 1000,
        10
      );

      if (decodedToken.iat < updatedAtTimestamp) {
        throw createApiError(
          401,
          "The password has been changed. Please login again"
        );
      }
    }

    //2.check if token is valid
    //3. check if user exists
    //4. check if password is changed
    //5.pass through
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const authorizationCheck = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw createApiError(
        403,
        "You do not have permission to perform this action"
      );
    }
    next();
  };
};

module.exports = {
  authenticationCheck,
  authorizationCheck,
};
