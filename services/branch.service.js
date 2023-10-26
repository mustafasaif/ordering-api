const db = require("../models/index");
const { Branch } = db;

module.exports = fetchAllBranch = async () => {
  try {
    const results = await Branch.findAll();
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
