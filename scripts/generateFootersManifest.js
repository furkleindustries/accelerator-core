const {
  writeFile,
} = require('fs-extra');
const getHotReloadAcceptor = require('./getHotReloadAcceptor');
const glob = require('glob');
const path = require('path');
const slash = require('slash');

const authoredFootersDir = path.join(__dirname, '..', 'footers');

/* Collect all files within the footers directory ending in .js, .jsx, .ts, or .tsx. */
glob(path.join(authoredFootersDir, '**/!(*.test).[jt]sx'), async (err, files) => {
  try {
    if (err) {
      throw err;
    }
  
    const importPaths = [];

    const manifestStr =
      'import { IFooter } from \'../src/passages/IFooter\';\n\n' +
      files.map((filePath, index) => {
        const importPath = slash(
          path.relative(__dirname, filePath).replace(/\.[jt]sx?$/, ''),
        );

        importPaths.push(importPath);
        return `import import_${index} from '${importPath}';`;
      }).join('\n') +
      '\nconst manifest: Array<{ filepath: string, footerObject: IFooter, }> = [\n' +
      files.map((path, index) => {
        return `  {\n    filepath: \`${path}\`,\n    footerObject: import_${index},\n  },`;
      }).join('') +
      '\n];\n\nexport default manifest;\n\n' +
      getHotReloadAcceptor(importPaths) +
      '\n';
  
    await writeFile(path.join(authoredFootersDir, 'footers-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
