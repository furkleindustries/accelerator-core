import {
  IBreadcrumbTrailAware,
} from '../../interfaces/IBreadcrumbTrailAware';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  INamed,
} from '../../interfaces/INamed';
import {
  OneOrMaybeReadonlyArray,
} from '../../typeAliases/OneOrMaybeReadonlyArray';
import {
  ComponentType,
  ReactElement,
} from 'react';

export interface IBreadcrumbTrailOwnProps extends
  IClassNameable,
  Partial<INamed>
{
  readonly children: OneOrMaybeReadonlyArray<ReactElement[]>;
  readonly listComponent: ComponentType<IBreadcrumbTrailAware & {
    readonly children: OneOrMaybeReadonlyArray<any>;
    readonly open?: boolean;
    readonly root?: boolean;
  }>;
}
