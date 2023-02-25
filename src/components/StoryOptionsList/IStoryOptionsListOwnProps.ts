import {
  IBreadcrumbItem,
} from '../BreadcrumbTrail/IBreadcrumbItem';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IStoryOption,
} from '../../storyOptions/IStoryOption';
import {
  AriaAttributes,
  HTMLAttributes,
} from 'react';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IStoryOptionsListOwnProps
  extends
    IClassNameable,
    AriaAttributes,
    Omit<HTMLAttributes<HTMLUListElement | HTMLOListElement>, 'className'>
{
  readonly clickOption: (breadcrumb: IBreadcrumbItem) => void;
  readonly crumb: IBreadcrumbItem;
  readonly children?: ReactNodeWithoutNullOrUndefined;
  readonly childOptions?: readonly IStoryOption[];
  readonly root?: boolean;
  readonly title?: string;
}
