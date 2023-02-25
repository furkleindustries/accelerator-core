import {
  IAction,
} from '../actions/IAction';
import type {
  Dispatch,
} from 'redux';

export interface IDispatchAware<T extends IAction = IAction> {
  readonly dispatch: Dispatch<IAction>;
}
