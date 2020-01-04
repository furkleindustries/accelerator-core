import {
  IVisibilityTree,
} from './IVisibilityTree';
import {
  TreeSelector,
} from './TreeSelector';

export interface IVisibilityTreeAware {
  readonly treeSelector: TreeSelector;
  readonly visibilityTree: IVisibilityTree;
}
