const {
  getObjectValues,
} = require('../functions/getObjectValues');
const {
  FontFormats,
} = require('./FontFormats');
const {
  FontRanges,
} = require('./FontRanges');
const {
  FontStyles,
} = require('./FontStyles');
const {
  normalizeFontName,
} = require('./normalizeFontName');
const {
  assert,
} = require('ts-assertions');

module.exports = {};
module.exports.normalizeFont = (font) => {
  if (typeof font === 'string') {
    return normalizeFontName(font);
  } else {
    const {
      family,
      formats,
      styles,
      ranges,
      weights,
    } = font;

    assert(family && typeof family === 'string');

    assert(formats);
    assert(formats.length);

    const formatsIsArray = Array.isArray(formats);
    const formatsIsString = typeof formats === 'string';
    const formatsIsAllValidFontFormats = formats.filter((ff) => (
      getObjectValues(FontFormats).indexOf(ff.toLowerCase()) === -1
    )).length === 0;

    assert(
      formatsIsString || (formatsIsArray && formatsIsAllValidFontFormats),
    );

    assert(ranges);
    assert(ranges.length);

    const rangesIsArray = Array.isArray(ranges);
    const rangesIsString = typeof ranges === 'string';
    const rangesIsAllValidFontFormats = ranges.filter((rr) => (
      getObjectValues(rr).indexOf(rr.toLowerCase()) === -1
    )).length > 0;

    assert(
      rangesIsString || (rangesIsArray && rangesIsAllValidFontFormats),
    );

    assert(styles);
    assert(styles.length);

    const stylesIsArray = Array.isArray(styles);
    const stylesIsAllValidFontStyles = styles.filter((ss) => (
      getObjectValues(ss).indexOf(ss.toLowerCase()) === -1
    )).length > 0;

    assert(
      stylesIsArray && stylesIsAllValidFontStyles,
    );

    assert(weights);
    assert(weights.length);

    const weightsIsArray = Array.isArray(weights);
    const weightsIsAllValidNumbers = weights.filter((ww) => (
      ww > 0 && ww % 1 === 0
    ));

    assert(
      weightsIsArray && weightsIsAllValidNumbers,
    );

    return {
      weights,
      family: normalizeFontName(family),
      formats: (
        Array.isArray(formats) ?
          formats.map((str) => str.toLowerCase()) :
          formats.toLowerCase()
      ),

      styles: styles.map((str) => str.toLowerCase()),
      ranges: (
        Array.isArray(ranges) ?
          ranges.map((str) => str.toLowerCase()) :
          formats.toLowerCase()
      ),
    };
  }
};
