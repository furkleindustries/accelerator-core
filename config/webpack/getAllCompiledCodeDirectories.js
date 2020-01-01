import {
  paths,
} from '../paths';

export const getAllCompiledCodeDirectories = () => [
  paths.appSrc,
  paths.bundles,
  paths.footers,
  paths.headers,
  paths.inkLib,
  paths.mutators,
  paths.passages,
  paths.plugins,
  paths.renderers,
  paths.storyOptions,
];
