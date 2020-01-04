import {
  FontFormats,
} from './FontFormats';
import {
  FontRanges,
} from './FontRanges';
import {
  FontStyles,
} from './FontStyles';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';

export interface IFontLoadingDetails {
  readonly family: string;
  readonly formats: FontFormats | MaybeReadonlyArray<FontFormats>;
  readonly ranges: FontRanges | MaybeReadonlyArray<FontRanges>;
  readonly styles: FontStyles |
    readonly [ FontStyles ] |
    readonly [ FontStyles, FontStyles ];

  readonly weights: MaybeReadonlyArray<number>;
}
