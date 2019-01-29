const {
  writeFile,
} = require('fs-extra');
const getFileImports = require('./functions/getFileImports');
const getHotReloadAcceptor = require('./functions/getHotReloadAcceptor');
const getPassageObjectDefinitions = require('./functions/getPassageObjectDefinitions');
const glob = require('glob');
const path = require('path');
const slash = require('slash');

const authoredPassagesDir = path.join(__dirname, '..', 'passages');

/* Collect all files within the passages directory ending in .js, .jsx, .ts, or .tsx. */
glob(path.join(authoredPassagesDir, '**/!(*.test).[jt]sx?'), async (err, files) => {
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
      'import { IPassage } from \'../src/passages/IPassage\';\n\n' +
      imports.join('') +
      '\nconst manifest: Array<{ filepath: string, passageObject: IPassage, }> = [\n' +
      getPassageObjectDefinitions().join('') +
      '\n];\n\nexport default manifest;\n' +
      getHotReloadAcceptor(importPaths) +
      '\n';
    
    await writeFile(path.join(authoredPassagesDir, 'passages-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
