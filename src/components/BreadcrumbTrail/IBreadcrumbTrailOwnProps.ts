import {
  IBreadcrumbItem,
} from '../Breadcrumb/IBreadcrumbItem';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ComponentType,
  ReactElement,
} from 'react';

export interface IBreadcrumbTrailOwnProps extends IClassNameable {
  readonly children: ReadonlyArray<ReactElement>;
  readonly listComponent: ComponentType<{
    readonly children: ReadonlyArray<ReactElement>;
    readonly breadcrumbTrail?: IBreadcrumbItem[];
    readonly open?: boolean;
  }>;
  readonly trail: IBreadcrumbItem[];
}
