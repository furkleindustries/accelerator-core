import chalk from 'chalk';
import {
  getFontFaceString,
} from './getFontFaceString';
import {
  getFontFilepath,
} from './getFontFilepath';
import {
  getHelperVariant,
} from './getHelperVariant';
import {
  getUnicodeRange,
} from './getUnicodeRange';
import {
  parse as pathParse,
} from 'path';
import {
  paths,
} from '../../config/paths';

const fontsDir = paths.fontsDir;

export const getFontFaceRules = (
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
) =>(
  (Array.isArray(ranges) ? ranges : [ ranges ]).reduce((rangesArr, range) => (
    rangesArr.concat((Array.isArray(styles) ? styles : [ styles ]).reduce((stylesArr, style) => (
      stylesArr.concat(weights.reduce((weightsArr, weight) => {
        const helper = getHelperVariant({
          family,
          style,
          variants,
          weight,
        });

        const { local = [] } = helper;

        let localName;
        if (local.length) {
          localName = local[1] || local[0];
        } else {
          localName = family.replace(new RegExp(/\s/), '-');
        }

        const srcUrls = formats.map((format) => (
          `url('` +
            `${directory}/` +
            pathParse(
              getFontFilepath({
                family,
                format,
                style,
                weight,
                fontsDir,
              })
            ).name +
            `.${format}` +
          `') format('${format}')`
        )).join(', ');

        const unicodeRange = getUnicodeRange(range);

        return [
          ...weightsArr,
          getFontFaceString({
            family,
            localName,
            range,
            srcUrls,
            style,
            unicodeRange,
            weight,
          }),
        ];
      }, []))
    ), []))
  ), [])
);
