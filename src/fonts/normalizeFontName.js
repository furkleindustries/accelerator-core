module.exports = {};
module.exports.normalizeFontName = (string) => (
  string.replace(/\s/g, '-').toLowerCase()
);
