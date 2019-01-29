const {
  writeFile,
} = require('fs-extra');
const getFileImports = require('./functions/getFileImports');
const getHotReloadAcceptor = require('./functions/getHotReloadAcceptor');
const getPassageObjectDefinitions = require('./functions/getAuthoredAssetObjectDefinitions');
const path = require('path');
const scrapeAssets = require('./functions/scrapeAssets');

const authoredHeadersDir = path.join(__dirname, '..', 'headers');

(async () => {
  try {
    const files = await scrapeAssets(authoredHeadersDir);

    const {
      importPaths,
      imports,
    } = getFileImports(files);

    const manifestStr =
      'import { IHeader } from \'../src/passages/IHeader\';\n\n' +
      imports.join('\n') +
      '\nconst manifest: Array<{ filepath: string, headerObject: IHeader, }> = [\n' +
      getPassageObjectDefinitions(files, 'headerObject').join('\n') +
      '\n];\n\nexport default manifest;\n' +
      getHotReloadAcceptor(importPaths) +
      '\n';

    await writeFile(path.join(authoredHeadersDir, 'headers-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
