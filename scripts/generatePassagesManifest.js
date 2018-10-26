const {
  readFileSync,
  writeFile,
} = require('fs-extra');
const {
  join,
  relative,
} = require('path');
const glob = require('glob');

const passagesDir = join(__dirname, '..', 'passages');
/* Collect all files within the passage directory ending in .jsx or .tsx. */
glob(join(passagesDir, '**/!(*.test).[jt]sx'), (err, files) => {
  if (err) {
    throw err;
  }

  const jsonStr = JSON.stringify(files.map((path) => relative(passagesDir, path)));
  writeFile(join(passagesDir, 'passages-manifest.json'), jsonStr, (err) => {
    if (err) {
      throw err;
    }
  });
});
