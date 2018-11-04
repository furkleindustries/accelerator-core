import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface ILinkDispatchProps {
  dispatch: Dispatch<IAction>;
}
