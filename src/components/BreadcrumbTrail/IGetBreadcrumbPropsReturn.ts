import {
  IBreadcrumbItem,
} from './IBreadcrumbItem';
import {
  IVisibilityTree,
} from './IVisibilityTree';

export interface IGetBreadcrumbPropsReturn {
  readonly breadcrumbTrail: ReadonlyArray<IBreadcrumbItem>;
  readonly visibilityTree: IVisibilityTree;
  addBreadcrumb(crumb: IBreadcrumbItem): void;
  removeBreadcrumb(): void;
}
