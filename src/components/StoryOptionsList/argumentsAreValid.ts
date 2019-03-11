import {
  IBreadcrumbItem,
} from '../Breadcrumb/IBreadcrumbItem';

export function argumentsAreValid<
  T extends Record<any, any> & {
    readonly breadcrumbTrail: IBreadcrumbItem[],
    addBreadcrumb(crumb: IBreadcrumbItem): any,
    removeBreadcrumb(): any
  },
>(args: any): args is T {
  return (
    args &&
    Array.isArray(args.breadcrumbTrail) &&
    typeof args.addBreadcrumb === 'function' &&
    typeof args.removeBreadcrumb === 'function'
  );
}
