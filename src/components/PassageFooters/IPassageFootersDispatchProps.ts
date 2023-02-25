import {
  IAction,
} from '../../actions/IAction';
import type {
  Dispatch,
} from 'redux';

export interface IPassageFootersDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
