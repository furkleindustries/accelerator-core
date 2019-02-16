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
  readonly ranges: FontRanges | FontRanges[];
  readonly styles: FontStyles | [ FontStyles ] | [ FontStyles, FontStyles ];
  readonly weights: number[];
}
