import {
  IBreadcrumbItem,
} from './IBreadcrumbItem';
import {
  IVisibilityTree,
} from './IVisibilityTree';

export interface IBreadcrumbTrailState {
  readonly trail: ReadonlyArray<IBreadcrumbItem>;
  readonly visibilityTree: IVisibilityTree;
}
