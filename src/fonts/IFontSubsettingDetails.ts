import {
  FontFormats,
} from './FontFormats';

export interface IFontSubsettingDetails {
  readonly formats: FontFormats | FontFormats[];
  readonly fromFont: string;
  readonly name: string;
  readonly subsetRange: 'US_ASCII' | 'LATIN' | string | string[];
}
