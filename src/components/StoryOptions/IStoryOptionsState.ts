import {
  IBreadcrumbItem,
} from '../Breadcrumb/IBreadcrumbItem';

export interface IStoryOptionsState {
  readonly modalVisible: boolean;
  readonly trail: IBreadcrumbItem[];
}
