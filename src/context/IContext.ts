import {
  IAcceleratorConfigAware,
} from '../interfaces/IAcceleratorConfigAware';
import {
  IFootersContext,
} from './IFootersContext';
import {
  IHeadersContext,
} from './IHeadersContext';
import {
  IPassagesMapContext,
} from './IPassagesMapContext';
import {
  IPluginsContext,
} from './IPluginsContext';
import {
  IReduxStoreAware,
} from '../interfaces/IReduxStoreAware';
import {
  ISoundManagerAware,
} from '../interfaces/ISoundManagerAware';

export interface IContext extends
  IAcceleratorConfigAware,
  IFootersContext,
  IHeadersContext,
  IPassagesMapContext,
  IPluginsContext,
  ISoundManagerAware,
  IReduxStoreAware
{
}
