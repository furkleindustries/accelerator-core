import {
  IAction,
} from '../actions/IAction';
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
  IPassageRendererConstructorContext,
} from './IPassageRendererConstructorContext';
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
  IPassageRendererConstructorContext,
  IPassagesMapAndStartPassageNameContext,
  IPluginsContext,
  ISoundManagerContext
{
  readonly store: Store<IState, IAction>;
}
