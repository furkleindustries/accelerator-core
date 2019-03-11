import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ComponentType,
  ReactElement,
} from 'react';
import { IBreadcrumbTrailAware } from '../../interfaces/IBreadcrumbTrailAware';

export interface IBreadcrumbTrailOwnProps<T extends any = any> extends IClassNameable {
  readonly children: ReadonlyArray<ReactElement<T>>;
  readonly listComponent: ComponentType<IBreadcrumbTrailAware & {
    readonly children: ReadonlyArray<any>
    readonly root?: boolean;
  }>;
  readonly name?: string;
}
