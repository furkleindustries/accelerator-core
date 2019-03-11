import {
  IBreadcrumbItem,
} from '../components/Breadcrumb/IBreadcrumbItem';

export interface IBreadcrumbTrailAware {
  readonly breadcrumbTrail?: IBreadcrumbItem[];
  addBreadcrumb?(crumb: IBreadcrumbItem): void;
  removeBreadcrumb?(): void;
}
