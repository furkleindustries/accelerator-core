import {
  IAction,
} from '../../actions/IAction';
import type {
  Dispatch,
} from 'redux';

export interface IPassageContentContainerDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
