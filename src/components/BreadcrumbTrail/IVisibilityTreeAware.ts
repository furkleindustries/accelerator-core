import {
  IVisibilityTree,
} from './IVisibilityTree';

export interface IVisibilityTreeAware {
  readonly visibilityTree?: IVisibilityTree;
}
