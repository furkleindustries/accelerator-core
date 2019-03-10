import {
  IBreadcrumbItem,
} from './IBreadcrumbItem';
import {
  IClickable,
} from '../../interfaces/IClickable';
import {
  INoChildren,
} from '../../interfaces/INoChildren';

export interface IBreadcrumbOwnProps extends IClickable, INoChildren {
  readonly crumb: IBreadcrumbItem;
}
