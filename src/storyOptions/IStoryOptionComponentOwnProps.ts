import {
  IBreadcrumbItem,
} from '../components/BreadcrumbTrail/IBreadcrumbItem';
import {
  IClassNameable,
} from '../interfaces/IClassNameable';
import {
  AriaAttributes,
  HTMLAttributes,
} from 'react';

export interface IStoryOptionComponentOwnProps
  extends
    IClassNameable,
    AriaAttributes,
    Omit<HTMLAttributes<HTMLElement>, 'className'>
{
  readonly clickOption: (breadcrumb: IBreadcrumbItem) => void;
  readonly crumb: IBreadcrumbItem;
}
