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
  family: string,
  style: FontStyles,
  variants: IFontHelperVariant[],
  weight: number,
}): IFontHelperVariant;