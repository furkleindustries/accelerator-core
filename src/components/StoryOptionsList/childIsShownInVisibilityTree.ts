import {
  IVisibilityTree,
} from '../BreadcrumbTrail/IVisibilityTree';

export function childIsShownInVisibilityTree(
  visibilityTree: IVisibilityTree,
  indices: number | ReadonlyArray<number>,
): boolean {
  const safeIndices = Array.isArray(indices) ? indices : [ indices ];
  let last: IVisibilityTree = visibilityTree as any;
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
}
