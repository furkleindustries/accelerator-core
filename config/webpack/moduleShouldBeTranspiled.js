import {
  getPathsToBabelify,
} from './getPathsToBabelify';
import {
  moduleHasEsNextField,
} from './moduleHasEsNextField';
import slash from 'slash';

const pathsToBabelify = getPathsToBabelify();

export function moduleShouldBeTranspiled(fp, alreadySlashed) {
  const filepath = alreadySlashed ? fp : slash(fp);

  for (const defaultPath of pathsToBabelify) {
    if (filepath.startsWith(defaultPath)) {
      return true;
    }
  }
  
  return moduleHasEsNextField(filepath);
}
