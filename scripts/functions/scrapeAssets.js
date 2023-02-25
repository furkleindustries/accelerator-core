import {
  checkAssetShouldBeScraped,
} from './checkAssetShouldBeScraped';
import glob from 'glob';
import * as path from 'path';

/* Collect all files within the specified directory ending in .jsx, or .tsx. */
export const scrapeAssets = (directory) => new Promise((resolve, reject) => (
  glob(path.join(directory, '**/*'), (err, files) => {
    if (err) {
      return reject(err);
    }

    const finalPaths = files
      .filter(checkAssetShouldBeScraped)
      .map(path.parse)
      .map(({
        base,
        dir,
        ext,
      }) => path.join(dir, base));

    return resolve(finalPaths);
  })
));
