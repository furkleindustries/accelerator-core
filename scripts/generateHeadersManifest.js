const {
  writeFile,
} = require('fs-extra');
const getFileImports = require('./functions/getFileImports');
const getHotReloadAcceptor = require('./functions/getHotReloadAcceptor');
const getPassageObjectDefinitions = require('./functions/getPassageObjectDefinitions');
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

    const normalizedFiles = files.map(slash);
    const {
      importPaths,
      imports,
    } = getFileImports(normalizedFiles);

    const manifestStr =
      'import { IHeader } from \'../src/passages/IHeader\';\n\n' +
      imports.join('') +
      '\nconst manifest: Array<{ filepath: string, headerObject: IHeader, }> = [\n' +
      getPassageObjectDefinitions(normalizedFiles).join('') +
      '\n];\n\nexport default manifest;\n' +
      getHotReloadAcceptor(importPaths) +
      '\n';

    await writeFile(path.join(authoredHeadersDir, 'headers-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
