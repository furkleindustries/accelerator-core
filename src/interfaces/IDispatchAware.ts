import {
  IAction,
} from '../actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface IDispatchAware<T extends IAction = IAction> {
  readonly dispatch: Dispatch<IAction>;
}
