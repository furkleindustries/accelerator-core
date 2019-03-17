import {
  FontFormats,
} from './FontFormats';
import {
  FontLoadingStrategies,
} from './FontLoadingStrategies';

export function getFontSubsetDefaults() {
  return {
    fromFamily: undefined,
    formats: [
      FontFormats.WOFF,
      FontFormats.WOFF2,
    ],

    loadingStrategy: FontLoadingStrategies.Preload,
    name: undefined,
    subsetRange: 'US_ASCII',
  };
}
