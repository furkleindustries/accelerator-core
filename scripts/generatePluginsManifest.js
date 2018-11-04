const {
  readFileSync,
  writeFile,
} = require('fs-extra');
const {
  join,
  relative,
} = require('path');
const glob = require('glob');

const pluginsDir = join(__dirname, '..', 'plugins');
/* Collect all files within the passage directory ending in .jsx or .tsx. */
glob(join(pluginsDir, '**/!(*.test).[jt]sx'), (err, files) => {
  if (err) {
    throw err;
  }

  const jsonStr = JSON.stringify(files.map((path) => relative(pluginsDir, path)));
  writeFile(join(pluginsDir, 'plugins-manifest.json'), jsonStr, (err) => {
    if (err) {
      throw err;
    }
  });
});
