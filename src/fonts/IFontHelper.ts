import {
  FontRanges,
} from './FontRanges';
import {
  IFontHelperVariant,
} from './IFontHelperVariant';

export interface IFontHelper {
  readonly category: string;
  readonly family: string;
  readonly fontWeight: number;
  readonly id: string;
  readonly subsets: readonly FontRanges[];
  readonly variants: readonly IFontHelperVariant[];
}
