const {
  assertValid,
} = require('ts-assertions');

module.exports = {};
module.exports.getHelperVariant = ({
  style,
  variants,
  weight,
}) => assertValid(
  variants.find(({
    fontStyle,
    fontWeight,
  }) => style === fontStyle && String(weight) === fontWeight),
);
