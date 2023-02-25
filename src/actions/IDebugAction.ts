import {
  ActionTypes,
} from './ActionTypes';

export interface IDebugAction {
  readonly type: ActionTypes.Debug;
  readonly value: boolean;
}
