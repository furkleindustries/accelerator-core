const fs = require('fs-extra');
const getAutogeneratedFileWarning = require('./functions/getAutogeneratedFileWarning');
const getFileImports = require('./functions/getFileImports');
const getHotReloadAcceptor = require('./functions/getHotReloadAcceptor');
const getPassageObjectDefinitions = require('./functions/getAuthoredAssetObjectDefinitions');
const path = require('path');
const scrapeAssets = require('./functions/scrapeAssets');

const authoredPassagesDir = path.join(__dirname, '..', 'passages');

(async () => {
  try {
    /* Do not include the init file as a passage. */
    const files = (await scrapeAssets(authoredPassagesDir))
      .filter((aa) => !aa.endsWith('_initialization.tsx'));

    const {
      importPaths,
      imports,
    } = getFileImports(files);
  
    const manifestStr =
      getAutogeneratedFileWarning() +
      '\n\nimport { IPassage } from \'../src/passages/IPassage\';\n\n' +
      imports.join('\n') +
      '\nconst manifest: Array<{ filepath: string, passageObject: IPassage, }> = [\n' +
      getPassageObjectDefinitions(files, 'passageObject').join('\n') +
      '\n];\n\nexport default manifest;\n\n' +
      getHotReloadAcceptor(importPaths) +
      '\n';

    const manifestPath = path.join(authoredPassagesDir, 'passages-manifest.ts');
    await fs.writeFile(manifestPath, manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
