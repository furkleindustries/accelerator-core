import {
  IBreadcrumbItem,
} from '../Breadcrumb/IBreadcrumbItem';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';

export interface IBreadcrumbTrailOwnProps extends IClassNameable {
  readonly trail: IBreadcrumbItem[];
}
