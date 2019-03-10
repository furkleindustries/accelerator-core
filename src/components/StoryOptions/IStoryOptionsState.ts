import {
  IBreadcrumbItem,
} from '../Breadcrumb/IBreadcrumbItem';
import {
  IOpenable,
} from '../../interfaces/IOpenable';

export interface IStoryOptionsState extends IOpenable {
  readonly open: boolean;
  readonly trail: IBreadcrumbItem[];
}
