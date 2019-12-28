import * as fs from 'fs-extra';
import {
  getFontApiUrl,
} from './getFontApiUrl';
import {
  getFontFilepath,
} from './getFontFilepath';
import {
  getHelperVariant,
} from './getHelperVariant';
import request from 'request';
import {
  assert,
  assertValid,
} from 'ts-assertions';

const apiUrl = getFontApiUrl();

export const downloadFontFiles = (
  {
    formats,
    styles,
    weights,
  },
  {
    family,
    variants,
  },
  downloadDirectory,
) => {
  const flatFormats = Array.isArray(formats) ? formats : [ formats ];
  return Promise.all(flatFormats.reduce((formatsArr, format) => {
    const flatStyles = Array.isArray(styles) ? styles : [ styles ];
    return formatsArr.concat(flatStyles.reduce((stylesArr, style) => {
      return stylesArr.concat(weights.reduce((weightsArr, weight) => {
        const { [format]: url } = assertValid(
          getHelperVariant({
            family,
            style,
            variants,
            weight,
          }),
        );

        assert(url);

        const filepath = getFontFilepath({
          family,
          format,
          style,
          weight,
          directory: downloadDirectory,
        });

        const req = request(url, {
          headers: { 'Content-type': 'application/json' },
        });

        const writeStream = fs.createWriteStream(filepath);
        req.pipe(writeStream);

        weightsArr.push(new Promise(async (allResolve, allReject) => {
          try {
            await Promise.all([
              new Promise((resolve, reject) => (
                req.on('response', resolve).on('error', reject)
              )),
  
              new Promise((resolve, reject) => (
                writeStream.on('close', resolve).on('error', reject)
              )),
            ]);
          } catch (err) {
            allReject(err);
          }

          allResolve(filepath);
        }));

        return weightsArr;
      }, []));
    }, []));
  }, []));
};
