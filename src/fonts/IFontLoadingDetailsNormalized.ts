import {
  IFontLoadingDetails,
} from './IFontLoadingDetails';
import {
  FontFormats,
} from './FontFormats';
import {
  FontRanges,
} from './FontRanges';
import {
  FontStyles,
} from './FontStyles';

export interface IFontLoadingDetailsNormalized extends IFontLoadingDetails {
  readonly formats: ReadonlyArray<FontFormats>;
  readonly ranges: ReadonlyArray<FontRanges>;
  readonly styles: [ FontStyles ] | [ FontStyles, FontStyles ];
}
