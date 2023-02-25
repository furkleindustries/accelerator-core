import {
  IAcceleratorConfigAware,
} from '../../interfaces/IAcceleratorConfigAware';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  IReduxStoreAware,
} from '../../interfaces/IReduxStoreAware';
import {
  ISoundManagerAware,
} from '../../interfaces/ISoundManagerAware';
import type {
  ReactElement,
} from 'react';

export interface IPassagePluginsWrapperOwnProps
  extends
    IAcceleratorConfigAware,
    IReduxStoreAware,
    ISoundManagerAware
{
  readonly children: ReactElement;
  readonly passagesMap: IPassagesMap;
  readonly plugins: readonly IPlugin[];
}
