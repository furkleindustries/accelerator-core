import {
  IBreadcrumbTrailAware,
} from '../interfaces/IBreadcrumbTrailAware';
import {
  IClassNameable,
} from '../interfaces/IClassNameable';
import {
  IHideable,
} from '../interfaces/IHideable';

export interface IStoryOptionComponentOwnProps
  extends
    IBreadcrumbTrailAware,
    IClassNameable,
    IHideable
{
  readonly optionPropName?: string | null;
  updateOptionValue?(value: any): void;
}
