import {
  IVisibilityTree,
} from '../BreadcrumbTrail/IVisibilityTree';

export function childIsShownInVisibilityTree(
  visibilityTree: IVisibilityTree,
  indices: number | number[],
): boolean {
  return Boolean(
    visibilityTree &&
    visibilityTree.visible &&
    visibilityTree.children &&
    (
      Array.isArray(indices) ?
        indices.reduce<IVisibilityTree | null>((prev, index) => {
          if (prev &&
              prev.children &&
              prev.children[index] &&
              prev.children[index].visible)
          {
            return prev.children[index];
          }

          return null;
        }, visibilityTree) :
        visibilityTree.children[indices].visible
    )
  );
}