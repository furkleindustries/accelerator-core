import {
  IBreadcrumbItem,
} from './IBreadcrumbItem';
import {
  IVisibilityTree,
} from './IVisibilityTree';

export interface IBreadcrumbTrailState {
  readonly trail: readonly IBreadcrumbItem[];
  readonly visibilityTree: IVisibilityTree;
}
