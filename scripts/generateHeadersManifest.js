const {
  readFileSync,
  writeFile,
} = require('fs-extra');
const {
  join,
  relative,
} = require('path');
const glob = require('glob');

const headersDir = join(__dirname, '..', 'headers');
/* Collect all files within the passage directory ending in .jsx or .tsx. */
glob(join(headersDir, '**/!(*.test).[jt]sx'), (err, files) => {
  if (err) {
    throw err;
  }

  const jsonStr = JSON.stringify(files.map((path) => relative(headersDir, path)));
  writeFile(join(headersDir, 'headers-manifest.json'), jsonStr, (err) => {
    if (err) {
      throw err;
    }
  });
});
