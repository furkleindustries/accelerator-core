const {
  writeFile,
} = require('fs-extra');
const getFileImports = require('./functions/getFileImports');
const getHotReloadAcceptor = require('./functions/getHotReloadAcceptor');
const getPassageObjectDefinitions = require('./functions/getPassageObjectDefinitions');
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

    const normalizedFiles = files.map(slash);
    const {
      importPaths,
      imports,
    } = getFileImports(normalizedFiles);

    const manifestStr =
      'import { IFooter } from \'../src/passages/IFooter\';\n\n' +
      imports.join('\n') +
      '\nconst manifest: Array<{ filepath: string, footerObject: IFooter, }> = [\n' +
      getPassageObjectDefinitions(files).join('') +
      '\n];\n\nexport default manifest;\n\n' +
      getHotReloadAcceptor(importPaths) +
      '\n';

    await writeFile(path.join(authoredFootersDir, 'footers-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
