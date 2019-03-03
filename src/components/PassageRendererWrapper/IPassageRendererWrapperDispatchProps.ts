import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface IPassageRendererWrapperDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
