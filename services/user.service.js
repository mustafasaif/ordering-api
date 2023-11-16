const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const { User, Sequelize } = db;
const isNull = require("lodash/isNull");
const { createApiError } = require("../utils/apiError");
const { dateRangeFilter } = require("../utils/commonFunctions");

const registerNewUser = async (userData) => {
  try {
    const { firstName, lastName, email, password, role, branchId } = userData;

    const existingUser = await User.findOne({ where: { email } });

    if (!isNull(existingUser)) {
      throw createApiError(
        409,
        "Post Operation failed",
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
      branchId,
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

const deleteUserById = async (userId) => {
  try {
    const deletedUser = await User.destroy({ where: { userId } });
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (filterData) => {
  try {
    const {
      email,
      firstName,
      lastName,
      startDate,
      endDate,
      day,
      q,
      limit,
      userId,
      role,
    } = filterData;

    let options = { where: {}, limit };
    if (email) options.where.email = email;
    if (firstName) options.where.firstName = firstName;
    if (lastName) options.where.lastName = lastName;
    dateRangeFilter({ options, startDate, endDate, day, Sequelize });

    if (q) {
      options.where[Sequelize.Op.or] = [
        { email: { [Sequelize.Op.like]: `%${q}%` } },
        { firstName: { [Sequelize.Op.like]: `%${q}%` } },
        { lastName: { [Sequelize.Op.like]: `%${q}%` } },
      ];
    }

    if (role === "sales") {
      options.where.userId = userId;
    }
    if (role === "branch_manager") {
      options.where.branchId = branchId;
    }
    if (role === "user") {
      options.where.branchId = branchId;
    }
    options.limit = parseInt(limit) || 50;
    console.log(options.where);
    const users = await User.findAndCountAll(options);

    return users;
  } catch (error) {
    throw error;
  }
};

const updateUserbyId = async (userId, userData) => {
  try {
    const updatedUser = await User.update(
      { ...userData },
      { where: { userId } }
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  registerNewUser,
  deleteUserById,
  getAllUsers,
  updateUserbyId,
};
