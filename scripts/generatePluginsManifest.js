const {
  writeFile,
} = require('fs-extra');
const getFileImports = require('./functions/getFileImports');
const getHotReloadAcceptor = require('./functions/getHotReloadAcceptor');
const getPassageObjectDefinitions = require('./functions/getPassageObjectDefinitions');
const glob = require('glob');
const path = require('path');
const slash = require('slash');

const authoredPluginsDir = path.join(__dirname, '..', 'plugins');

/* Collect all files within the plugins directory ending in .jsx, .js, .tsx, or .ts. */
glob(path.join(authoredPluginsDir, '**/!(*.test).[jt]sx?'), async (err, files) => {
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
      'import { IPluginExport, } from \'../src/plugins/IPluginExport\';\n' +
      imports.join('\n') +
      '\nconst manifest: Array<{ filepath: string, pluginExport: IPluginExport }> = [\n' +
      getPassageObjectDefinitions(files).join('\n') +
      '\n];\n\n' +
      'export default manifest;\n' + 
      getHotReloadAcceptor(importPaths) +
      '\n';
    
    await writeFile(path.join(authoredPluginsDir, 'plugins-manifest.ts'), manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
