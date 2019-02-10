import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface IPassageContextWrapperDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
