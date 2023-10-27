const db = require("../models/index");
const { Branch } = db;

const fetchAllBranch = async () => {
  try {
    const results = await Branch.findAll();
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteSpecificBranch = async (branchId) => {
  try {
    const deletedBranch = await Branch.destroy({ where: { branchId } });
    return deletedBranch;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchAllBranch,
  deleteSpecificBranch,
};
