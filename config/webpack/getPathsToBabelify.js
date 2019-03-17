import {
  getAllCompiledCodeDirectories,
} from './getAllCompiledCodeDirectories';
import {
  getNodeModulesToAlwaysTranspile,
} from './getNodeModulesToAlwaysTranspile';
import * as path from 'path';
import {
  paths,
} from '../paths';
import slash from 'slash';

export function getPathsToBabelify() {
  return Object.freeze([
    ...getAllCompiledCodeDirectories(),
    ...getNodeModulesToAlwaysTranspile().map((moduleName) => (
      path.join(paths.appNodeModules, moduleName)
    )),
  ].map((path) => slash(path)));
}
