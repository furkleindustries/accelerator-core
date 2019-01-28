const {
  writeFile,
} = require('fs-extra');
const getHotReloadAcceptor = require('./getHotReloadAcceptor');
const glob = require('glob');
const path = require('path');
const slash = require('slash');

const authoredPluginsDir = path.join(__dirname, '..', 'plugins');
/* Collect all files within the plugins directory ending in .jsx or .tsx. */
glob(path.join(authoredPluginsDir, '**/!(*.test).[jt]sx'), async (err, files) => {
  try {
    if (err) {
      throw err;
    }
  
    const importPaths = [];
  
    const manifestStr =
      'import { IPluginExport, } from \'../src/plugins/IPluginExport\';\n' +
      files.map((filePath, index) => {
        const importPath = slash(
          path.relative(__dirname, filePath).replace(/.[jt]sx$/, ''),
        );

        importPaths.push(importPath);
        return `import import_${index} from '${importPath}';\n`;
      }).join('') +
      '\nconst manifest: Array<{ filepath: string, pluginExport: IPluginExport, }> = [\n' +
      files.map((path, index) => {
        return `  {\n    filepath: \`${path}\`,\n    pluginExport: import_${index},\n  },`;
      }).join('') +
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
