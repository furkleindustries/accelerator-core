import {
  FontFormats,
} from './FontFormats';
import {
  FontLoadingStrategies,
} from './FontLoadingStrategies';

export interface IFontSubsettingDetails {
  readonly formats: FontFormats | FontFormats[];
  readonly fromFont: string;
  readonly loadingStrategy: FontLoadingStrategies;
  readonly name: string;
  readonly subsetRange: 'US_ASCII' | 'LATIN' | string | string[];
}
