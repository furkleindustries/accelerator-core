import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';

export interface ICyclingLinkInternalDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
