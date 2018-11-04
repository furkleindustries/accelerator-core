const {
  writeFile,
} = require('fs-extra');
const {
  join,
  relative,
} = require('path');
const glob = require('glob');
const slash = require('slash');

const authoredPluginsDir = join(__dirname, '..', 'plugins');
/* Collect all files within the plugins directory ending in .jsx or .tsx. */
glob(join(authoredPluginsDir, '**/!(*.test).[jt]sx'), (err, files) => {
  if (err) {
    throw err;
  }

  const manifestStr =
    'import { IPluginExport, } from \'../src/plugins/IPluginExport\';\n' +
    files.map((path, index) => {
      const importPath = relative(__dirname, path).replace(/.[jt]sx$/, '');
      return `import import_${index} from '${slash(importPath)}';\n`;
    }) +
    '\nconst manifest: Array<{ filepath: string, pluginExport: IPluginExport, }> = [\n' +
    files.map((path, index) => {
      return `  {\n    filepath: \`${path}\`,\n    pluginExport: import_${index},\n  },`;
    }) +
    '\n];\n\n' +
    'export default manifest;\n';
  
  writeFile(join(authoredPluginsDir, 'plugins-manifest.ts'), manifestStr, (err) => {
    if (err) {
      throw err;
    }
  });
});
