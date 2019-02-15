const {
  FontRanges,
} = require('./FontRanges');

module.exports = {};
module.exports.getUnicodeRange = (range) => {
  if (range === FontRanges.Cyrillic) {
    return 'U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116';
  } else if (range === FontRanges.CyrillicExtended) {
    return 'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F';
  } else if (range === FontRanges.Greek) {
    return 'U+0370-03FF';
  } else if (range === FontRanges.GreekExtended) {
    return 'U+1F00-1FFF';
  } else if (range === FontRanges.Latin) {
    return 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
  } else if (range === FontRanges.LatinExtended) {
    return 'U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF';
  } else if (range == FontRanges.Vietnamese) {
    return 'U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB';
  }

  throw new Error('Unicode range not found.');
};
