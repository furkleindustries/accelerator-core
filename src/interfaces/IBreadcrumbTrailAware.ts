import {
  IGetBreadcrumbPropsReturn,
  IVisibilityTreeAware,
} from '../components/BreadcrumbTrail';

export interface IBreadcrumbTrailAware {
  readonly treeSelector?: IVisibilityTreeAware['treeSelector'];
  readonly getBreadcrumbProps?: () => IGetBreadcrumbPropsReturn;
}
