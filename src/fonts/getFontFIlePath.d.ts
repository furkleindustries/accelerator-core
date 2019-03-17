import {
  FontRanges,
} from './FontRanges';
import {
  FontStyles,
} from './FontStyles';

export function getFontFilepath({
  directory,
  family,
  range,
  style,
  weight,
}: {
  directory: string,
  family: string,
  range: FontRanges,
  style: FontStyles;
  weight: number,
}): string;
