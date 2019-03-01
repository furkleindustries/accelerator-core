import {
  paths,
} from '../paths';

export function getAllCompiledCodeDirectories() {
  return [
    paths.appSrc,
    paths.footers,
    paths.passages,
    paths.headers,
    paths.plugins,
    paths.renderers,
  ];
}
