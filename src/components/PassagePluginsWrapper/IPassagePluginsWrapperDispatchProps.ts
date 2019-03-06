import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface IPassagePluginsWrapperDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
