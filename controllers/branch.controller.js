const fetchAllBranch = require("../services/branch.service");

module.exports = getAllBranch = async (req, res, next) => {
  try {
    const results = await fetchAllBranch();
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
