const glob = require('glob');
const path = require('path');

/* Collect all files within the specified directory ending in .js, .jsx, .ts,
 * or .tsx. */
module.exports = function scrapeAssets(directory) {
  return new Promise((resolve, reject) => (
    glob(path.join(directory, '**/!(*.test|*-manifest).[jt]s?(x)'), (err, files) => {
      if (err) {
        return reject(err);
      }

      return resolve(files);
    })
  ));
}
