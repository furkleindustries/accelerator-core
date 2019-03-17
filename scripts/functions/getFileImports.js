import * as path from 'path';
import slash from 'slash';

export function getFileImports(files) {
  const importPaths = [];
  return {
    importPaths,
    imports: files.map((filePath, index) => {
      const importPath = slash(
        path.relative(path.dirname(__dirname), filePath),
      ).replace(/\.[jt]sx?$/, '');
        
      importPaths.push(importPath);
      return `import import_${index} from '${importPath}';`;
    }),
  };
}
