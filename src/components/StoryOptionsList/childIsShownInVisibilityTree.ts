import {
  IVisibilityTree,
} from '../BreadcrumbTrail/IVisibilityTree';

export function childIsShownInVisibilityTree(
  visibilityTree: IVisibilityTree,
  indices: number | ReadonlyArray<number>,
): boolean {
  if (visibilityTree && visibilityTree.visible && visibilityTree.children) {
    if (Array.isArray(indices)) {
      return Boolean(
        indices.reduce<IVisibilityTree | null>((prev, index) => {
          if (prev &&
              prev.children &&
              prev.children[index] &&
              prev.children[index].visible)
          {
            return prev.children[index];
          }

          return null;
        }, visibilityTree)
      );
    } else {
      return visibilityTree.children[indices as number] && visibilityTree.children[indices as number].visible;
    }
  }
  
  return true;
}
