import {
  IBreadcrumbItem,
} from '../BreadcrumbTrail/IBreadcrumbItem';
import {
  TreeSelector,
} from '../BreadcrumbTrail/TreeSelector';

export function argumentsAreValid<
  T extends Record<any, any> & {
    readonly breadcrumbTrail: readonly IBreadcrumbItem[],
    readonly treeSelector: TreeSelector,
    addBreadcrumb(crumb: IBreadcrumbItem): any,
    removeBreadcrumb(): any,
  },
>(args: any): args is T {
  return (
    args &&
    Array.isArray(args.breadcrumbTrail) &&
    typeof args.addBreadcrumb === 'function' &&
    typeof args.removeBreadcrumb === 'function'
  );
}
