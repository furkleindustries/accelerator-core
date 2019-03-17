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
  updateOptionValue?(propName: string, value: any): void;
}
