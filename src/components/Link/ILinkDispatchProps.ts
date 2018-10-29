import {
  IAction,
} from 'src/actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface ILinkDispatchProps {
  dispatch: Dispatch<IAction>;
}

export default ILinkDispatchProps;
