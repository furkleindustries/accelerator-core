import {
  FontRanges,
} from './FontRanges';
import * as path from 'path';
import {
  assertValid,
} from 'ts-assertions';

export const getFontFilepath = ({
  family,
  fontsDir,
  format,
  style,
  weight,
}) => (
  path.join(
    assertValid(fontsDir),

    assertValid(family).replace(/\s+/g, '-') +
      '-' +
      assertValid(style) + 
      '-' +
      assertValid(weight) + 
      '.' +
      assertValid(format),
  )
);
