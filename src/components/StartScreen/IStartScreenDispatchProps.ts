import {
  IPassageNavigationAction,
} from '../../actions/IPassageNavigationAction';
import type {
  Dispatch,
} from 'redux';

export interface IStartScreenDispatchProps {
  readonly dispatch: Dispatch<IPassageNavigationAction>;
}
