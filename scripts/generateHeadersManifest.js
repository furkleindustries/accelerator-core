const {
  writeFile,
} = require('fs-extra');
const getHotReloadAcceptor = require('./getHotReloadAcceptor');
const glob = require('glob');
const path = require('path');
const slash = require('slash');

const authoredHeadersDir = path.join(__dirname, '..', 'headers');

/* Collect all files within the headers directory ending in .js, .jsx, .ts, or .tsx. */
glob(path.join(authoredHeadersDir, '**/!(*.test).[jt]sx?'), async (err, files) => {
  try {
    if (err) {
      throw err;
    }
  
    const importPaths = [];
  
    const manifestStr =
      'import { IHeader } from \'../src/passages/IHeader\';\n\n' +
      files.map((filePath, index) => {
        const importPath = slash(
          path.relative(__dirname, filePath).replace(/\.[jt]sx?$/, ''),
        );

        importPaths.push(importPath); 
        return `import import_${index} from '${importPath}';\n`;
      }).join('') +
      '\nconst manifest: Array<{ filepath: string, headerObject: IHeader, }> = [\n' +
      files.map((path, index) => {
        return `  {\n    filepath: \`${path}\`,\n    headerObject: import_${index},\n  },`;
      }).join('') +
      '\n];\n\nexport default manifest;\n' +
      getHotReloadAcceptor(importPaths) +
      '\n';

    await writeFile(path.join(authoredHeadersDir, 'headers-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
