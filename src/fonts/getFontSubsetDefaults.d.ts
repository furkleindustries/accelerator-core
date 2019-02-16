import {
  FontFormats,
} from './FontFormats';
import {
  FontLoadingStrategies,
} from './FontLoadingStrategies';
import {
  IFontSubsettingDetailsNormalized,
} from './IFontSubsettingDetailsNormalized';

export function getFontSubsetDefaults(): {
  readonly formats: FontFormats[],
  readonly loadingStrategy: FontLoadingStrategies.Preload,
  readonly subsetRange: 'US_ASCII';
};
