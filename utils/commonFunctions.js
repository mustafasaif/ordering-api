const removeDuplicateBranches = (arr, key) => {
  const result = [];
  const map = new Map();

  for (const obj of arr) {
    const keyValue = obj[key];

    if (map.has(keyValue)) {
      // If a duplicate with the same key exists, push the nested object into the users array
      const existingObject = map.get(keyValue);
      existingObject.users.push(obj.users);
    } else {
      // If not a duplicate, add it to the result and the map
      obj.users = [obj.users]; // Convert users to an array
      result.push(obj);
      map.set(keyValue, obj);
    }
  }

  return result;
};

const dateRangeFilter = ({ options, startDate, endDate, day, Sequelize }) => {
  let currentDate;

  if (day) {
    switch (day) {
      case "today":
        currentDate = new Date();
        options.where.createdAt = {
          [Sequelize.Op.between]: [
            new Date(currentDate.setUTCHours(0, 0, 0, 0)),
            new Date(currentDate.setUTCHours(23, 59, 59, 59)),
          ],
        };

        break;
      case "week":
        currentDate = new Date();
        const startOfWeek = new Date();
        startOfWeek.setUTCHours(0, 0, 0, 0);
        startOfWeek.setDate(currentDate.getDate() - 7);
        const endOfWeek = new Date(currentDate.setUTCHours(23, 59, 59, 59));
        options.where.createdAt = {
          [Sequelize.Op.between]: [startOfWeek, endOfWeek],
        };

        break;
      case "month":
        currentDate = new Date();
        const startOfMonth = new Date();
        startOfMonth.setUTCHours(0, 0, 0, 0);
        startOfMonth.setMonth(currentDate.getMonth() - 1);
        const endOfMonth = new Date(currentDate.setUTCHours(23, 59, 59, 59));
        options.where.createdAt = {
          [Sequelize.Op.between]: [startOfMonth, endOfMonth],
        };
        break;

      default:
        currentDate = new Date();
        options.where.createdAt = {
          [Sequelize.Op.between]: [
            new Date(currentDate.setUTCHours(0, 0, 0, 0)),
            new Date(currentDate.setUTCHours(23, 59, 59, 59)),
          ],
        };
        break;
    }
  }
  if (startDate) {
    if (!endDate) {
      options.where.createdAt = new Date(
        new Date(startDate).setUTCHours(0, 0, 0, 0)
      );
    } else {
      options.where.createdAt = {
        [Sequelize.Op.between]: [
          new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)),
          new Date(new Date(endDate).setUTCHours(23, 59, 59, 59)),
        ],
      };
    }
  }
};

module.exports = {
  removeDuplicateBranches,
  dateRangeFilter,
};
