import {
  paths,
} from '../paths';

export const getAllCompiledCodeDirectories = () => [
  paths.appSrc,
  paths.bundles,
  paths.footers,
  paths.headers,
  paths.inkMutators,
  paths.passages,
  paths.plugins,
  paths.renderers,
  paths.storyOptions,
];
