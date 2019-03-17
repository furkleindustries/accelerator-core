import glob from 'glob';
import * as path from 'path';

/* Collect all files within the specified directory ending in .jsx, or .tsx. */
export function scrapeAssets(directory) {
  return new Promise((resolve, reject) => (
    /* Ignore any file or folder beginning with _.*/
    glob(path.join(directory, '!(_)*/**/!(*.test).[jt]sx'), (err, files) => {
      if (err) {
        return reject(err);
      }

      return resolve(files);
    })
  ));
}
