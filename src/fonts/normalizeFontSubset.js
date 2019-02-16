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
  assert,
} from 'ts-assertions';

export function normalizeFontSubset(subsetArg) {
  let subset = subsetArg;
  if (typeof subset === 'string') {
    subset = {
      fromFont: subset,
      name: `${subset} Subset`,
    };
  }
  
  const {
    formats,
    fromFont,
    loadingStrategy,
    name,
    subsetRange,
  } = subset;

  const {
    formats: defaultFormats,
    loadingStrategy: defaultLoadingStrategy,
    subsetRange: defaultSubsetRange,
  } = getFontSubsetDefaults();

  subset = {
    fromFont,
    name,
    formats: formats || defaultFormats,
    loadingStrategy: loadingStrategy || defaultLoadingStrategy,
    subsetRange: subsetRange || defaultSubsetRange,
  };

  assert(subset.fromFont && subset.fromFont.length);
  assert(subset.formats && subset.formats.length);
  
  if (typeof subset.formats === 'string') {
    subset.formats = [ subset.formats ];
  }
  
  const fls = getObjectValues(FontLoadingStrategies);
  assert(fls.indexOf(subset.loadingStrategy) !== -1);

  assert(subset.name && subset.name.length);
  assert(subset.subsetRange && subsetRange.length);

  if (Array.isArray(subset.subsetRange)) {
    subset.subsetRange = [ subset.subsetRange ];
  }

  return subset;
}
