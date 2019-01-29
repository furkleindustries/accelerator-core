const path = require('path');

module.exports = function getFileImports(files) {
  const importPaths = [];
  const ret = {
    imports: files.map((filePath, index) => {
      const importPath = (
        path.relative(__dirname, filePath).replace(/\.[jt]sx?$/, '')
      );

      importPaths.push(importPath);
      return `import import_${index} from '${importPath}';`;
    }),
  };

  ret.importPaths = importPaths;

  return ret;
};
