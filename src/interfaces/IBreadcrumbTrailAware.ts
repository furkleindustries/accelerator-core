import {
  IGetBreadcrumbPropsReturn,
} from '../components/BreadcrumbTrail';

export interface IBreadcrumbTrailAware {
  readonly treeSelector?: ReadonlyArray<number>;
  getBreadcrumbProps?(): IGetBreadcrumbPropsReturn;
}
