import {
  IGetBreadcrumbPropsReturn,
} from '../components/BreadcrumbTrail/IGetBreadcrumbPropsReturn';

export interface IBreadcrumbTrailAware {
  readonly treeSelector?: ReadonlyArray<number>;
  getBreadcrumbProps?(): IGetBreadcrumbPropsReturn;
}
