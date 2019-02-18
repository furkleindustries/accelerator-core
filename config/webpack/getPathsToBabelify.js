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
    paths.appSrc,
    paths.passagesSrc,
    paths.headersSrc,
    paths.footersSrc,
    paths.pluginsSrc,
    paths.acceleratorConfig,
    ...getNodeModulesToAlwaysTranspile().map((moduleName) => (
      path.join(paths.appNodeModules, moduleName)
    )),
  ].map((path) => slash(path)));
}
