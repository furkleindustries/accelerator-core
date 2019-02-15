const {
  warn,
} = require('colorful-logging');
const {
  getFontApiUrl,
} = require('./getFontApiUrl');
const {
  normalizeFont,
} = require('./normalizeFont');
const request = require('request');

module.exports = {};
module.exports.downloadFontHelper = (fontLoaderObj) => {
  let url = `${getFontApiUrl()}/`;
  if (typeof font === 'string') {
    url += normalizeFont(fontLoaderObj);
  } else {
    const {
      family,
      ranges,
    } = normalizeFont(fontLoaderObj);

    url += `${family}?subsets=`;
    if (ranges === 'string') {
      url += ranges;
    } else {
      url += ranges.join(',');
    }
  }

  return new Promise((resolve, reject) => request(
    url,
    {
      headers: { 'Application-Type': 'application/json' },
    },
    (err, response) => {
      if (err) {
        return reject(err);
      }

      const toJSON = response.toJSON();
      const {
        body,
        statusCode,
      } = toJSON;

      if (String(statusCode)[0] !== '2') {
        warn(`${body.slice(0, 105)}...`);

        const {
          family,
          weights,
        } = fontLoaderObj;

        const fontName = normalizeFont(family || fontLoaderObj);
        return reject(
          'The statusCode of one of the font helper requests (for ' +
            `${fontName[0].toUpperCase()}${fontName.slice(1)} ` +
            `${weights ? `with weights ${weights.join(', ')}` : ''}) was ` +
            `${statusCode}.`
        );
      }

      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch (err) {
        return reject(err);
      }

      return resolve(parsed);
    },
  ));
};
