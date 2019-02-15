module.exports.getFrozenObject = (...sources) => (
  Object.freeze(Object.assign({}, ...sources))
);
