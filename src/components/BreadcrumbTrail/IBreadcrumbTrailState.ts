import {
  IBreadcrumbItem,
} from '../Breadcrumb/IBreadcrumbItem';
import {
  IVisibilityTree,
} from './IVisibilityTree';

export interface IBreadcrumbTrailState {
  readonly trail: ReadonlyArray<IBreadcrumbItem>;
  readonly visibilityTree: IVisibilityTree;
}
