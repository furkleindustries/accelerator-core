import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface IPassageContentContainerDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
