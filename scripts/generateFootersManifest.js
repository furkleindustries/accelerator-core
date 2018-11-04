const {
  writeFile,
} = require('fs-extra');
const {
  join,
  relative,
} = require('path');
const glob = require('glob');
const slash = require('slash');

const authoredFootersDir = join(__dirname, '..', 'footers');
/* Collect all files within the passage directory ending in .jsx or .tsx. */
glob(join(authoredFootersDir, '**/!(*.test).[jt]sx'), (err, files) => {
  if (err) {
    throw err;
  }

  const manifestStr =
    'import { IFooter, } from \'../src/passages/IFooter\';\n\n' +
    files.map((path, index) => {
      const importPath = relative(__dirname, path).replace(/.[jt]sx$/, '');
      return `import import_${index} from '${slash(importPath)}';\n`;
    }).join('') +
    '\nconst manifest: Array<{ filepath: string, footerObject: IFooter, }> = [\n' +
    files.map((path, index) => {
      return `  {\n    filepath: \`${path}\`,\n    footerObject: import_${index},\n  },`;
    }).join('') +
    '\n];\n\nexport default manifest;\n';

  writeFile(join(authoredFootersDir, 'footers-manifest.ts'), manifestStr, (err) => {
    if (err) {
      throw err;
    }
  });
});
