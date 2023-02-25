import {
  IAction,
} from '../../actions/IAction';
import type {
  Dispatch,
} from 'redux';

export interface IPassageRendererDispatchProps {
  readonly dispatch: Dispatch<IAction>;
}
