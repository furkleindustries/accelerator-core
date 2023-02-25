import {
  ActionTypes,
} from '../ActionTypes';
import {
  IDebugAction,
} from '../IDebugAction';

export const createDebugAction = (value: boolean): IDebugAction => (
  Object.freeze({
    type: ActionTypes.Debug,
    value,
  })
);
