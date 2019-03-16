import {
  IBreadcrumbTrailAware,
} from '../../interfaces/IBreadcrumbTrailAware';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  Component,
  ComponentType,
  ReactElement,
} from 'react';

export interface IBreadcrumbTrailOwnProps extends IClassNameable {
  readonly children: ReadonlyArray<ReactElement>;
  readonly listComponent: ComponentType<IBreadcrumbTrailAware & {
    readonly children: ReadonlyArray<any>;
    readonly open?: boolean;
    readonly root?: boolean;
    closeList?(component: Component): void;
  }>;

  readonly name?: string;
}
