import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface IPassageRendererDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
