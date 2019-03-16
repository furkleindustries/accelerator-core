import {
  IBreadcrumbItem,
} from '../BreadcrumbTrail/IBreadcrumbItem';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IClickable,
} from '../../interfaces/IClickable';
import {
  INoChildren,
} from '../../interfaces/INoChildren';

export interface IBreadcrumbOwnProps
  extends
    IClassNameable,
    IClickable,
    INoChildren
{
  readonly crumb: IBreadcrumbItem;
}
