const {
  writeFile,
} = require('fs-extra');
const getFileImports = require('./functions/getFileImports');
const getHotReloadAcceptor = require('./functions/getHotReloadAcceptor');
const getPassageObjectDefinitions = require('./functions/getAuthoredAssetObjectDefinitions');
const path = require('path');
const scrapeAssets = require('./functions/scrapeAssets');

const authoredPassagesDir = path.join(__dirname, '..', 'passages');

(async () => {
  try {
    const files = await scrapeAssets(authoredPassagesDir);

    const {
      importPaths,
      imports,
    } = getFileImports(files);
  
    const manifestStr =
      'import { IPassage } from \'../src/passages/IPassage\';\n\n' +
      imports.join('\n') +
      '\nconst manifest: Array<{ filepath: string, passageObject: IPassage, }> = [\n' +
      getPassageObjectDefinitions(files, 'passageObject').join('\n') +
      '\n];\n\nexport default manifest;\n\n' +
      getHotReloadAcceptor(importPaths) +
      '\n';
    
    await writeFile(path.join(authoredPassagesDir, 'passages-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
