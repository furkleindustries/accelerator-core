const {
  writeFile,
} = require('fs-extra');
const getAuthoredAssetObjectDefinitions = require('./functions/getAuthoredAssetObjectDefinitions');
const getFileImports = require('./functions/getFileImports');
const getHotReloadAcceptor = require('./functions/getHotReloadAcceptor');
const path = require('path');
const scrapeAssets = require('./functions/scrapeAssets');

const authoredPluginsDir = path.join(__dirname, '..', 'plugins');

(async () => {
  try {
    const files = await scrapeAssets(authoredPluginsDir);

    const {
      importPaths,
      imports,
    } = getFileImports(files);
  
    const manifestStr =
      'import { IPluginExport, } from \'../src/plugins/IPluginExport\';\n' +
      imports.join('\n') +
      '\nconst manifest: Array<{ filepath: string, pluginExport: IPluginExport }> = [\n' +
      getAuthoredAssetObjectDefinitions(files, 'pluginExport').join('\n') +
      '\n];\n\n' +
      'export default manifest;\n' + 
      getHotReloadAcceptor(importPaths) +
      '\n';
    
    await writeFile(path.join(authoredPluginsDir, 'plugins-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
