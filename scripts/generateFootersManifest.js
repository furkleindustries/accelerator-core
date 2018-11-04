const {
  readFileSync,
  writeFile,
} = require('fs-extra');
const {
  join,
  relative,
} = require('path');
const glob = require('glob');

const footersDir = join(__dirname, '..', 'footers');
/* Collect all files within the passage directory ending in .jsx or .tsx. */
glob(join(footersDir, '**/!(*.test).[jt]sx'), (err, files) => {
  if (err) {
    throw err;
  }

  const jsonStr = JSON.stringify(files.map((path) => relative(footersDir, path)));
  writeFile(join(footersDir, 'footers-manifest.json'), jsonStr, (err) => {
    if (err) {
      throw err;
    }
  });
});
