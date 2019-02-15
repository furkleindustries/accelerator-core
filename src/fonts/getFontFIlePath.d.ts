import {
  FontRanges,
} from './FontRanges';
import {
  FontStyles,
} from './FontStyles';

export function getFontFilePath({
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
