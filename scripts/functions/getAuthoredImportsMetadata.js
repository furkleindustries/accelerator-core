import * as path from 'path';
import slash from 'slash';

export const getAuthoredImportsMetadata = (files) => {
  const importPaths = [];
  const imports = [];
  const registry = {};
  
  files.forEach((filepath, index) => {
    const importPath = slash(
      path.relative(path.dirname(__dirname), filepath),
    ).replace(/\.[jt]sx?$/, '');

    const filename = path.basename(importPath);

    importPaths.push(importPath);
    imports.push(`import import_${index} from '${importPath}';`);
    registry[filename] = filename;
  });

  return {
    importPaths,
    imports,
    registry,
  };
};
