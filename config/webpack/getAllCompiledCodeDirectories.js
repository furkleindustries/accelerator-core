import {
  paths,
} from '../paths';

export function getAllCompiledCodeDirectories() {
  return [
    paths.appSrc,
    paths.footers,
    paths.headers,
    paths.inkLib,
    paths.passages,
    paths.plugins,
    paths.renderers,
    paths.storyOptions,
  ];
}
