import {
  IBreadcrumbTrailAware,
} from '../interfaces/IBreadcrumbTrailAware';
import {
  IClassNameable,
} from '../interfaces/IClassNameable';
import {
  IOpenable,
} from '../interfaces/IOpenable';

export interface IStoryOptionComponentOwnProps
  extends
    IBreadcrumbTrailAware,
    IClassNameable,
    IOpenable
{
  readonly optionPropName?: string | null;
  updateOptionValue?(value: any): void;
}
