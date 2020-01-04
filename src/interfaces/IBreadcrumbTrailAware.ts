import {
  IGetBreadcrumbPropsReturn,
} from '../components/BreadcrumbTrail/IGetBreadcrumbPropsReturn';
import {
  IVisibilityTreeAware,
} from '../components/BreadcrumbTrail/IVisibilityTreeAware';

export interface IBreadcrumbTrailAware extends IVisibilityTreeAware {
  readonly getBreadcrumbProps: () => IGetBreadcrumbPropsReturn;
}
