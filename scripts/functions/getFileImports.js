const path = require('path');
const slash = require('slash');

module.exports = function getFileImports(files) {
  const importPaths = [];
  return {
    imports: files.map((filePath, index) => {
      const importPath = slash(
        path.relative(
          path.dirname(__dirname),
          filePath,
        ).replace(/\.[jt]sx?$/, '')
      );
        
      importPaths.push(importPath);
      return `import import_${index} from '${importPath}';`;
    }),

    importPaths,
  };
};
