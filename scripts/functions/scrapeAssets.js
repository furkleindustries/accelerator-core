const glob = require('glob');
const path = require('path');

/* Collect all files within the specified directory ending in .jsx, or .tsx. */
module.exports = function scrapeAssets(directory) {
  return new Promise((resolve, reject) => (
    glob(path.join(directory, '**/!(*.test).[jt]sx'), (err, files) => {
      if (err) {
        return reject(err);
      }

      return resolve(files);
    })
  ));
}
