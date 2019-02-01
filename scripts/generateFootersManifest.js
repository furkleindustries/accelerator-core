const {
  writeFile,
} = require('fs-extra');
const getFileImports = require('./functions/getFileImports');
const getHotReloadAcceptor = require('./functions/getHotReloadAcceptor');
const getPassageObjectDefinitions = require('./functions/getAuthoredAssetObjectDefinitions');
const path = require('path');
const scrapeAssets = require('./functions/scrapeAssets');

const authoredFootersDir = path.join(__dirname, '..', 'footers');

/* Collect all files within the footers directory ending in .js, .jsx, .ts, or .tsx. */
(async () => {
  try {
    const files = await scrapeAssets(authoredFootersDir);

    const {
      importPaths,
      imports,
    } = getFileImports(files);

    const manifestStr =
      'import { IFooter } from \'../src/passages/IFooter\';\n\n' +
      imports.join('\n') +
      '\nconst manifest: Array<{ filepath: string, footerObject: IFooter }> = [\n' +
      getPassageObjectDefinitions(files, 'footerObject').join('\n') +
      '\n];\n\nexport default manifest;\n\n' +
      getHotReloadAcceptor(importPaths) +
      '\n';

    await writeFile(path.join(authoredFootersDir, 'footers-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
