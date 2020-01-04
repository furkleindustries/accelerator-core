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
  readonly formats: readonly FontFormats[];
  readonly ranges: readonly FontRanges[];
  readonly styles: readonly [ FontStyles ] |
    readonly [ FontStyles, FontStyles ];
}
