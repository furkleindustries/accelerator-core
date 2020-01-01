import {
  FontStyles,
} from './FontStyles';
import {
  IFontHelperVariant,
} from './IFontHelperVariant';

export function getHelperVariant({
  family,
  style,
  variants,
  weight,
}: {
  readonly family: string,
  readonly style: FontStyles,
  readonly variants: readonly IFontHelperVariant[],
  readonly weight: number,
}): IFontHelperVariant;