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
    for (let ii = 0; ii < safeIndices.length; ii += 1) {
      last = last.children[safeIndices[ii]];
      if (last && last.visible === false) {
        return false;
      } else if (!last) {
        break;
      }
    }
  }

  return true;
}
