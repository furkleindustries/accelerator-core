import {
  IVisibilityTree,
} from '../BreadcrumbTrail/IVisibilityTree';
import {
  OneOrReadonlyArray,
} from '../../typeAliases/OneOrReadonlyArray';

export const childIsShownInVisibilityTree = (
  visibilityTree: IVisibilityTree,
  indices: OneOrReadonlyArray<number>,
): boolean => {
  const safeIndices = Array.isArray(indices) ? indices : [ indices ];
  let last = visibilityTree;
  for (let ii = 0; ii < safeIndices.length; ii += 1) {
    if (ii === 0) {
      last = last[safeIndices[ii]];
    } else {
      last = last.children[safeIndices[ii]];
    }

    if (last && last.visible === false) {
      return false;
    } else if (!last) {
      break;
    }
  }

  return true;
};
