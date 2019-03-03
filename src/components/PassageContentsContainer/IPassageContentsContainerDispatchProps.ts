import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface IPassageContentsContainerDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
