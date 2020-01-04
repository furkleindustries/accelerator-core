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
  readonly updateOptionValue?: (propName: string, value: any) => void;
}
