import {
  IAction,
} from '../actions/IAction';
import {
  IState,
} from '../state/IState';
import type {
  Store,
} from 'redux';

export interface IReduxStoreAware {
  readonly store: Store<IState, IAction>;
}
