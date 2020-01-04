import { IBreadcrumbTrailAware } from '../../interfaces/IBreadcrumbTrailAware';
import {
  IBreadcrumbItem,
} from '../BreadcrumbTrail/IBreadcrumbItem';
import {
  TreeSelector,
} from '../BreadcrumbTrail/TreeSelector';

export const argumentsAreValid = <
  T extends Record<any, any> &
    IBreadcrumbTrailAware &
    {
      readonly treeSelector: TreeSelector,
      readonly addBreadcrumb: (crumb: IBreadcrumbItem) => any,
      readonly removeBreadcrumb: () => any,
    },
>(args: any): args is T => (
  args &&
    Array.isArray(args.breadcrumbTrail) &&
    typeof args.addBreadcrumb === 'function' &&
    typeof args.removeBreadcrumb === 'function'
);
