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
import {
  paths,
} from '../../config/paths';

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
  return flatRanges.reduce((rangesArr, range) => {
    const flatStyles = Array.isArray(styles) ? styles : [ styles ];
    return rangesArr.concat(flatStyles.reduce((stylesArr, style) => {
      return stylesArr.concat(weights.reduce((weightsArr, weight) => {
        const { local } = getHelperVariant({
          family,
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
            `${directory}/${path.parse(filepath).name}.${format}` +
          `') format('${format}')`;
        }).join(', ');

        weightsArr.push(
          `/* ${range} */\n` +
          `@font-face {\n` +
          `  font-family: ${family};\n` +
          `  font-style: ${style};\n` +
          `  font-weight: ${weight};\n` +
          `  src: local('${local[0]}'), local('${local[1]}'), ${srcUrls};\n` +
          `  unicode-range: ${getUnicodeRange(range)};\n` +
          `}`
        );

        return weightsArr;
      }, []))
    }, []));
  }, []);
}
