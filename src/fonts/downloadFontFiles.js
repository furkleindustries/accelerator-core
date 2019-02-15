const fs = require('fs-extra');
const {
  getFontApiUrl,
} = require('./getFontApiUrl');
const {
  getFontFilePath,
} = require('./getFontFilepath');
const {
  getHelperVariant,
} = require('./getHelperVariant');
const request = require('request');
const {
  assert,
  assertValid,
} = require('ts-assertions')

const apiUrl = getFontApiUrl();

module.exports = {};
module.exports.downloadFontFiles = function (
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
) {
  const flatFormats = Array.isArray(formats) ? formats : [ formats ];
  return Promise.all(flatFormats.reduce((arr, format) => {
    const flatStyles = Array.isArray(styles) ? styles : [ styles ];
    return arr.concat(flatStyles.reduce((arr, style) => {
      return arr.concat(weights.reduce((arr, weight) => {
        const { [format]: url } = assertValid(
          getHelperVariant({
            style,
            variants,
            weight,
          }),
        );

        assert(url);

        const filepath = getFontFilePath({
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

        arr.push(new Promise((resolve, reject) => (
          Promise.all([
            new Promise((resolve, reject) => (
              req.on('response', resolve).on('error', reject)
            )),

            new Promise((resolve, reject) => (
              writeStream.on('close', resolve).on('error', reject)
            )),
          ]).then(() => resolve(filepath), reject)
        )));

        return arr;
      }, []));
    }, []));
  }, []));
};
