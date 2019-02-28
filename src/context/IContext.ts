import {
  IFootersContext,
} from './IFootersContext';
import {
  IHeadersContext,
} from './IHeadersContext';
import {
  IPassagesMapAndStartPassageNameContext,
} from './IPassagesMapAndStartPassageNameContext';
import {
  IPluginsContext,
} from './IPluginsContext';
import {
  ISoundManagerContext,
} from './ISoundManagerContext';
import {
  IState,
} from '../state/IState';
import {
  Store,
} from 'redux';

export interface IContext extends
  IFootersContext,
  IHeadersContext,
  IPassagesMapAndStartPassageNameContext,
  IPluginsContext,
  ISoundManagerContext
{
  readonly store: Store<IState>
}
