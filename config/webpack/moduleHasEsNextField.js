import {
  error,
} from 'colorful-logging';
import * as fs from 'fs';
import * as path from 'path';
import slash from 'slash';

const re = /(.+?\/node_modules\/.+?)\//;

const memoizedPackageJsonsWithEsNextFields = {};

export function moduleHasEsNextField(filepath) {
  const pkgRoot = (slash(filepath).match(re) || [])[1];
  if (!pkgRoot) {
    return false;
  }

  const packageJsonPath = path.join(pkgRoot, 'package.json');
  if (memoizedPackageJsonsWithEsNextFields[packageJsonPath]) {
    return true;
  }

  let pkg;
  try {
    const packageJsonText = fs.readFileSync(
      packageJsonPath,
      'utf8',
    );

    pkg = JSON.parse(packageJsonText);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      error(err);
    }
  }

  if (!pkg) {
    return false;
  }

  const hasProp = pkg.hasOwnProperty('esnext');
  if (hasProp) {
    /* Memoize the package.json. */
    memoizedPackageJsonsWithEsNextFields[packageJsonPath] = pkg;
    return true;
  }

  return false;
}
