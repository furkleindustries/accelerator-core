const {
  writeFile,
} = require('fs-extra');
const {
  join,
  relative,
} = require('path');
const glob = require('glob');
const slash = require('slash');

const authoredHeadersDir = join(__dirname, '..', 'headers');
/* Collect all files within the passage directory ending in .jsx or .tsx. */
glob(join(authoredHeadersDir, '**/!(*.test).[jt]sx'), (err, files) => {
  if (err) {
    throw err;
  }

  const manifestStr =
    'import { IHeader, } from \'../src/passages/IHeader\';\n\n' +
    files.map((path, index) => {
      const importPath = relative(__dirname, path).replace(/.[jt]sx$/, '');
      return `import import_${index} from '${slash(importPath)}';\n`;
    }).join('') +
    '\nconst manifest: Array<{ filepath: string, headerObject: IHeader, }> = [\n' +
    files.map((path, index) => {
      return `  {\n    filepath: \`${path}\`,\n    headerObject: import_${index},\n  },`;
    }).join('') +
    '\n];\n\nexport default manifest;\n';

  writeFile(join(authoredHeadersDir, 'headers-manifest.ts'), manifestStr, (err) => {
    if (err) {
      throw err;
    }
  });
});
