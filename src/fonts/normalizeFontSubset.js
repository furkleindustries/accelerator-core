import {
  FontLoadingStrategies,
} from './FontLoadingStrategies';
import {
  getFontSubsetDefaults,
} from './getFontSubsetDefaults';
import {
  getObjectValues,
} from '../functions/getObjectValues';
import {
  normalizeFontName,
} from './normalizeFontName';
import {
  assert,
} from 'ts-assertions';

export function normalizeFontSubset(subsetArg) {
  let subset = subsetArg;
  if (typeof subset === 'string') {
    subset = {
      fromFamily: subset,
      name: `${subset} Subset`,
    };
  }
  
  const {
    formats,
    fromFamily,
    loadingStrategy,
    subsetRange,
  } = subset;

  const {
    formats: defaultFormats,
    loadingStrategy: defaultLoadingStrategy,
    subsetRange: defaultSubsetRange,
  } = getFontSubsetDefaults();

  subset = {
    fromFamily,
    formats: formats || defaultFormats,
    loadingStrategy: loadingStrategy || defaultLoadingStrategy,
    subsetRange: subsetRange || defaultSubsetRange,
  };

  assert(subset.fromFamily && subset.fromFamily.length);
  subset.fromFamily = normalizeFontName(subset.fromFamily);

  assert(subset.formats && subset.formats.length);
  
  if (typeof subset.formats === 'string') {
    subset.formats = [ subset.formats ];
  }
  
  const fls = getObjectValues(FontLoadingStrategies);
  assert(fls.indexOf(subset.loadingStrategy) !== -1);

  assert(subset.subsetRange && subsetRange.length);

  if (Array.isArray(subset.subsetRange)) {
    subset.subsetRange = [ subset.subsetRange ];
  }

  return subset;
}
