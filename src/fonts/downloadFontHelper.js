import {
  getFontApiUrl,
} from './getFontApiUrl';
import {
  normalizeFont,
} from './normalizeFont';
import request from 'request';

export const downloadFontHelper = (fontLoaderObj) => {
  let url = `${getFontApiUrl()}/`;

  const {
    family,
    ranges,
    weights,
  } = normalizeFont(fontLoaderObj);

  /* Font looks are case-sensitive on the helper API. */
  url += `${family.toLowerCase().replace(/ /g, '-')}?subsets=`;
  if (ranges === 'string') {
    url += ranges;
  } else {
    url += ranges.join(',');
  }

  return new Promise((resolve, reject) => request(
    url,
  
    {
      headers: { 'Application-Type': 'application/json' }
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
        console.warn(
          `The fonts helper API returned the following error message:\n` +
          (body.slice(0, 105).length > 105 ?
            `${body.slice(0, 105)}...` :
            body),
        );

        return reject(
          'The statusCode of one of the font helper requests (for ' +
            `${family} ` +
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
}
