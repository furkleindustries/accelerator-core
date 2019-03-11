import {
  IFontSubsettingDetails,
} from './IFontSubsettingDetails';
import {
  FontFormats,
} from './FontFormats';

export interface IFontSubsettingDetailsNormalized extends IFontSubsettingDetails {
  readonly formats: ReadonlyArray<FontFormats>;
  readonly subsetRange: 'US_ASCII' | 'LATIN' | string;
}
