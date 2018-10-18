const {
  readdir,
  writeFile,
} = require('fs');
const {
  join,
} = require('path');

const path = join(__dirname, '..', 'passages');
readdir(path, (err, files) => {
  if (err) {
    throw err;
  }

  const jsonStr = JSON.stringify(files.filter((aa) => /\.[jt]sx?$/.test(aa)));
  writeFile(join(path, 'passages-manifest.json'), jsonStr, (err) => {
    if (err) {
      throw err;
    }
  });
});