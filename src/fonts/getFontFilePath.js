const {
  FontRanges,
} = require('./FontRanges');
const path = require('path');

module.exports = {};
module.exports.getFontFilePath = ({
  directory,
  family,
  format,
  style,
  weight,
}) => path.join(directory, `${family}-${style}-${weight}.${format}`);
