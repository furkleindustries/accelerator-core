import {
  FontFormats,
} from './FontFormats';
import {
  FontLoadingStrategies,
} from './FontLoadingStrategies';

export interface IFontSubsettingDetails {
  readonly formats: FontFormats | ReadonlyArray<FontFormats>;
  readonly fromFamily: string;
  readonly loadingStrategy: FontLoadingStrategies;
  readonly subsetRange: 'US_ASCII' | 'LATIN' | string | ReadonlyArray<string>;
}
