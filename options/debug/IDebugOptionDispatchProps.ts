import {
  IDebugAction,
} from '../../src/actions/IDebugAction';
import type {
  Dispatch,
} from 'redux';

export interface IDebugOptionDispatchProps {
  readonly dispatch: Dispatch<IDebugAction>;
}
