import {
  IBreadcrumbTrailAware,
} from '../interfaces/IBreadcrumbTrailAware';
import {
  IOpenable,
} from '../interfaces/IOpenable';

export interface IStoryOptionComponentOwnProps
  extends
    IBreadcrumbTrailAware,
    IOpenable
{
  readonly optionPropName?: string | null;
  updateOptionValue?(value: any): void;
}
