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

  module.exports = {
    removeDuplicateBranches

  }