import {
  FontRanges,
} from './FontRanges';
import {
  FontStyles,
} from './FontStyles';

export function getFontFilepath(args: {
  family: string;
  fontsDir: string;
  range: FontRanges;
  style: FontStyles;
  weight: number;
}): string;
