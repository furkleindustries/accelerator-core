import {
  IAction,
} from '../../actions/IAction';
import type {
  Dispatch,
} from 'redux';

export interface ICyclingLinkInternalDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
