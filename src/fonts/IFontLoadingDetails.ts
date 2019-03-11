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
  readonly formats: FontFormats | ReadonlyArray<FontFormats>;
  readonly ranges: FontRanges | ReadonlyArray<FontRanges>;
  readonly styles: FontStyles | [ FontStyles ] | [ FontStyles, FontStyles ];
  readonly weights: ReadonlyArray<number>;
}
