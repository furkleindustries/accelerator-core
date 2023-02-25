import {
  ActionTypes,
} from '../ActionTypes';
import {
  IPassageTimeAction,
} from '../IPassageTimeAction';

export const createPassageTimeAction = (): IPassageTimeAction => (
  Object.freeze({ type: ActionTypes.PassageTime })
);
