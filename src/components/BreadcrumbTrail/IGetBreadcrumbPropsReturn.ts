import {
  IBreadcrumbItem,
} from './IBreadcrumbItem';
import {
  IVisibilityTree,
} from './IVisibilityTree';

export interface IGetBreadcrumbPropsReturn {
  readonly breadcrumbTrail: readonly IBreadcrumbItem[];
  readonly visibilityTree: IVisibilityTree;
  readonly addBreadcrumb: (crumb: IBreadcrumbItem) => void;
  readonly removeBreadcrumb: () => void;
}
