import {
  getFontDefaults,
} from './getFontDefaults';
import {
  getObjectValues,
} from '../functions/getObjectValues';
import {
  FontFormats,
} from './FontFormats';
import {
  normalizeFontName,
} from './normalizeFontName';
import {
  assert,
} from 'ts-assertions';

export function normalizeFont(fontArg) {
  let font = fontArg; 
  if (typeof font === 'string') {
    font = { family: normalizeFontName(font) };
  }

  const {
    family: defaultFamily,
    formats: defaultFormats,
    styles: defaultStyles,
    ranges: defaultRanges,
    weights: defaultWeights,
  } = getFontDefaults();

  const {
    family,
    formats,
    styles,
    ranges,
    weights,
  } = font;

  font = {
    family: family || defaultFamily,
    formats: formats || defaultFormats,
    styles: styles || defaultStyles,
    ranges: ranges || defaultRanges,
    weights: weights || defaultWeights,
  };

  assert(font.family && typeof font.family === 'string');

  assert(font.formats);
  assert(font.formats.length);

  const formatsIsArray = Array.isArray(font.formats);
  const formatsIsString = typeof font.formats === 'string';
  const formatsIsAllValidFontFormats = font.formats.filter((ff) => (
    getObjectValues(FontFormats).indexOf(ff.toLowerCase()) === -1
  )).length === 0;

  assert(
    formatsIsString || (formatsIsArray && formatsIsAllValidFontFormats),
  );

  assert(font.ranges);
  assert(font.ranges.length);

  const rangesIsArray = Array.isArray(font.ranges);
  const rangesIsString = typeof font.ranges === 'string';
  const rangesIsAllValidFontFormats = font.ranges.filter((rr) => (
    getObjectValues(rr).indexOf(rr.toLowerCase()) === -1
  )).length > 0;

  assert(
    rangesIsString || (rangesIsArray && rangesIsAllValidFontFormats),
  );

  assert(font.styles);
  assert(font.styles.length);

  const stylesIsArray = Array.isArray(font.styles);
  const stylesIsAllValidFontStyles = font.styles.filter((ss) => (
    getObjectValues(ss).indexOf(ss.toLowerCase()) === -1
  )).length > 0;

  assert(
    stylesIsArray && stylesIsAllValidFontStyles,
  );

  assert(font.weights);
  assert(font.weights.length);

  const weightsIsArray = Array.isArray(font.weights);
  const weightsIsAllValidNumbers = font.weights.filter((ww) => (
    ww > 0 && ww % 1 === 0
  ));

  assert(
    weightsIsArray && weightsIsAllValidNumbers,
  );

  return {
    family: normalizeFontName(font.family),
    formats: font.formats.map((str) => str.toLowerCase()),
    styles: font.styles.map((str) => str.toLowerCase()),
    ranges: font.ranges.map((str) => str.toLowerCase()),
    weights: font.weights,
  };
}
