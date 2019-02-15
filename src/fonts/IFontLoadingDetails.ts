import {
  FontFormats,
} from './FontFormats';
import {
  FontRanges,
} from './FontRanges';
import {
  FontStyles,
} from './FontStyles';

export interface IFontLoadingDetails {
  readonly family: string;
  readonly formats: FontFormats | FontFormats[];
  readonly styles: FontStyles | [ FontStyles, FontStyles ];
  readonly ranges: FontRanges | FontRanges[];
  readonly weights: number[];
}
