import {
  getFontFilepath,
} from './getFontFilepath';
import {
  getHelperVariant,
} from './getHelperVariant';
import {
  getNormalizedAcceleratorConfig,
} from '../configuration/getNormalizedAcceleratorConfig';
import {
  getUnicodeRange,
} from './getUnicodeRange';
import * as path from 'path';

const { publicUrl } = getNormalizedAcceleratorConfig();

const fontsDir = path.join(__dirname, '..', '..', 'public', 'fonts');

export function getFontFaceRules(
  directory,
  {
    formats,
    styles,
    ranges,
    weights,
  },
  {
    family,
    variants,
  },
) {
  const flatRanges = Array.isArray(ranges) ? ranges : [ ranges ];
  return flatRanges.reduce((arr, range) => {
    const flatStyles = Array.isArray(styles) ? styles : [ styles ];
    return arr.concat(flatStyles.reduce((arr, style) => (
      arr.concat(weights.reduce((arr, weight) => {
        const { local } = getHelperVariant({
          style,
          variants,
          weight,
        });

        const srcUrls = formats.map((format) => {
          const filepath = getFontFilepath({
            family,
            format,
            style,
            weight,
            directory: fontsDir,
          });

          return `url('` +
            `${publicUrl}/${path.basename(directory)}/${path.parse(filepath).name}.${format}` +
          `') format('${format}')`;
        }).join(', ');

        arr.push(
          `/* ${range} */\n` +
          `@font-face {\n` +
          `  font-family: ${family};\n` +
          `  font-style: ${style};\n` +
          `  font-weight: ${weight};\n` +
          `  src: local('${local[0]}'), local('${local[1]}'), ${srcUrls};\n` +
          `  unicode-range: ${getUnicodeRange(range)};\n` +
          `}`
        );

        return arr;
      }, []))
    ), []));
  }, []);
}
