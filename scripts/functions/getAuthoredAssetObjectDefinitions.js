import slash from 'slash';
import {
  relative,
} from 'path';
import {
  paths,
} from '../../config/paths';

export const getAuthoredAssetObjectDefinitions = (files) => (
  files.map((path, index) => (
    `  {\n` +
    `    asset: import_${index},\n` +
    `    filepath: \`${slash(relative(paths.appPath, path))}\`,\n` +
    `  },`
  ))
);
