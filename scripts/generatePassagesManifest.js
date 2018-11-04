const {
  writeFile,
} = require('fs-extra');
const {
  join,
  relative,
} = require('path');
const glob = require('glob');
const slash = require('slash');

const authoredPassagesDir = join(__dirname, '..', 'passages');
/* Collect all files within the passages directory ending in .jsx or .tsx. */
glob(join(authoredPassagesDir, '**/!(*.test).[jt]sx'), (err, files) => {
  if (err) {
    throw err;
  }

  const manifestStr =
    'import { IPassage, } from \'../src/passages/IPassage\';\n\n' +
    files.map((path, index) => {
      const importPath = relative(__dirname, path).replace(/.[jt]sx$/, '');
      return `import import_${index} from '${slash(importPath)}';\n`;
    }).join('') +
    '\nconst manifest: Array<{ filepath: string, passageObject: IPassage, }> = [\n' +
    files.map((path, index) => {
      return `  {\n    filepath: \`${path}\`,\n    passageObject: import_${index},\n  },`;
    }).join('') +
    '\n];\n\nexport default manifest;\n';
  
  writeFile(join(authoredPassagesDir, 'passages-manifest.ts'), manifestStr, (err) => {
    if (err) {
      throw err;
    }
  });
});
