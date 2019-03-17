import {
  FontRanges,
} from './FontRanges';
import * as path from 'path';
import {
  assert,
} from 'ts-assertions';

export function getFontFilepath ({
  directory,
  family,
  format,
  style,
  weight,
}) {
  assert(directory);
  assert(family);
  assert(format);
  assert(style);
  assert(weight);

  return path.join(directory, `${family}-${style}-${weight}.${format}`);
}
