module.exports = {};
module.exports.getObjectValues = (obj) => (
  Object.keys(obj).map((aa) => obj[aa])
);
