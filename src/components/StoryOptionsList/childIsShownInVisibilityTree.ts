import {
  IVisibilityTree,
} from '../BreadcrumbTrail/IVisibilityTree';

export function childIsShownInVisibilityTree(
  visibilityTree: IVisibilityTree,
  indices: number | ReadonlyArray<number>,
): boolean {
  const safeIndices = Array.isArray(indices) ? indices : [ indices ];
  if (visibilityTree && visibilityTree.visible && visibilityTree.children) {
    let last = visibilityTree;
    let signal = true;
    for (let ii = 0; ii < safeIndices.length; ii += 1) {
      last = last.children[safeIndices[ii]];
      if (last && last.visible === false) {
        signal = false;
        break;
      } else if (!last) {
        break;
      }
    }

    if (!signal) {
      return false;
    }
  }

  return true;
}
