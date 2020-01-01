import {
  FontFormats,
} from './FontFormats';
import {
  FontLoadingStrategies,
} from './FontLoadingStrategies';

export interface IFontSubsettingDetails {
  readonly formats: FontFormats | readonly FontFormats[];
  readonly fromFamily: string;
  readonly loadingStrategy: FontLoadingStrategies;
  readonly subsetRange: 'US_ASCII' | 'LATIN' | string | readonly string[];
}
