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
  IOpenable,
} from '../../interfaces/IOpenable';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  OneOrMaybeReadonlyArray,
} from '../../typeAliases/OneOrMaybeReadonlyArray';
import {
  ComponentType,
  ReactElement,
} from 'react';

export interface IBreadcrumbTrailOwnProps extends
  IClassNameable,
  IOpenable,
  Partial<INamed>
{
  readonly children: (args: IBreadcrumbTrailAware) => OneOrMaybeReadonlyArray<MaybeReadonlyArray<ReactElement>>;
  readonly listComponent: (
    ComponentType<Partial<IBreadcrumbTrailAware> &
      IOpenable &
      {
        readonly children: OneOrMaybeReadonlyArray<any>;
        readonly root?: boolean;
      }
    >
  );
}
