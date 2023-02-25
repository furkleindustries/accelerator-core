import {
  IAutoplayerStateUpdateAction,
} from '../../src/actions/IAutoplayerStateUpdateAction';
import type {
  Dispatch,
} from 'redux';

export interface IAutoplayerOptionDispatchProps {
  readonly dispatch: Dispatch<IAutoplayerStateUpdateAction>;
}
