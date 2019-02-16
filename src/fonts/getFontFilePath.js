import {
  FontRanges,
} from './FontRanges';
import * as path from 'path';

export function getFontFilepath ({
  directory,
  family,
  format,
  style,
  weight,
}) {
  return path.join(directory, `${family}-${style}-${weight}.${format}`);
}
