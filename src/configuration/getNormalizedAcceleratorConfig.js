import config from '../../accelerator.config';
import {
  configurationDefaults,
} from './configurationDefaults';
import {
  normalizeFont,
} from '../fonts/normalizeFont';
import {
  normalizeFontSubset,
} from '../fonts/normalizeFontSubset';

let memoized;
export function getNormalizedAcceleratorConfig() {
  if (memoized) {
    return memoized;
  }

  memoized = {
    ...configurationDefaults,
    ...config,
  };

  if (Array.isArray(memoized.fontsToLoad)) {
    memoized.fontsToLoad = memoized.fontsToLoad.map(normalizeFont);
  }

  if (memoized.subsetFont) {
    memoized.subsetFont = normalizeFontSubset(memoized.subsetFont);
  }

  memoized = Object.freeze(memoized);

  return memoized;
}
