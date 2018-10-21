const {
  readFileSync,
  writeFile,
} = require('fs');
const {
  join,
  relative,
} = require('path');
const glob = require('glob');

const passagesDir = join(__dirname, '..', 'passages');
glob(join(passagesDir, '**/!(*.test).[jt]s?(x)'), (err, files) => {
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
