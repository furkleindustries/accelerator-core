import {
  FontStyles,
} from './FontStyles';
import {
  IFontHelperVariant,
} from './IFontHelperVariant';

export function getHelperVariant({
  style,
  variants,
  weight,
}: {
  style: FontStyles,
  variants: IFontHelperVariant[],
  weight: number,
}): IFontHelperVariant;