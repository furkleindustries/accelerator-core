import {
  ActionTypes,
} from '../ActionTypes';
import {
  IPassageReadyAction,
} from '../IPassageReadyAction';

export const createPassageReadyAction = (value: boolean): IPassageReadyAction => (
  Object.freeze({
    type: ActionTypes.PassageReady,
    value,
  })
);
