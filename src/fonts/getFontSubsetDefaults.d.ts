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
  readonly formats: readonly FontFormats[];
  readonly loadingStrategy: FontLoadingStrategies;
  readonly subsetRange: 'US_ASCII';
};
