import glob from 'glob';
import * as path from 'path';

/**
 * @todo Warn or throw if there's a directory which ends in test, which results
 * in should-be-legal files being thrown out due to name restrictions. Maybe
 * also a task for xlr8r.
 */

/* Collect all files within the specified directory ending in .jsx, or .tsx. */
export const scrapeAssets = (directory) => new Promise((resolve, reject) => (
  /* Ignore any file or folder beginning with _, and all test files.*/
  glob(path.join(directory, '**/*'), (err, files) => {
    if (err) {
      return reject(err);
    }

    const finalPaths = files
      .map((file) => path.parse(file))
      .filter(({
        ext,
        name,
      }) => (
        // No non-JSX/TSX files.
        /^\.[jt]sx$/i.test(ext) &&
          // No files beginning with _.
          /^[^_]/.test(name) &&
          // No files ending (pre-extension) in manifest or test.
          !/(manifest|test)$/i.test(name) ?
          true :
          false
      )).map(({
        dir,
        base,
      }) => path.join(dir, base));

    return resolve(finalPaths);
  })
));
