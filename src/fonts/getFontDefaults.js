import {
  FontFormats,
} from './FontFormats';
import {
  FontRanges,
} from './FontRanges';
import {
  FontStyles,
} from './FontStyles';

export function getFontDefaults() {
  return {
    family: 'Roboto',
    formats: [ FontFormats.WOFF, FontFormats.WOFF2 ],
    ranges: [ FontRanges.Latin, FontRanges.LatinExtended ],
    styles: [ FontStyles.Normal, FontStyles.Italic ],
    weights: [ 300, 400, 500 ],
  };
}
