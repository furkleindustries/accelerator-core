const {
  readFileSync,
  writeFile,
} = require('fs');
const {
  basename,
  join,
} = require('path');
const glob = require('glob');

const path = join(__dirname, '..', 'passages');
glob(join(path, '**/*.[jt]s?(x)'), (err, files) => {
  if (err) {
    throw err;
  }

  const jsonStr = JSON.stringify(files.map((path) => basename(path)));
  writeFile(join(path, 'passages-manifest.json'), jsonStr, (err) => {
    if (err) {
      throw err;
    }
  });
});
