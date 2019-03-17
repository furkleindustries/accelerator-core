import {
  FontRanges,
} from './FontRanges';
import {
  FontStyles,
} from './FontStyles';
import {
  IFontHelperVariant,
} from './IFontHelperVariant';

export interface IFontHelper {
  readonly category: string;
  readonly defSubset: FontRanges;
  readonly defVariant: FontStyles;
  readonly family: string;
  readonly fontWeight: number;
  readonly id: string;
  readonly subsets: ReadonlyArray<FontRanges>;
  readonly variants: ReadonlyArray<IFontHelperVariant>;
}
