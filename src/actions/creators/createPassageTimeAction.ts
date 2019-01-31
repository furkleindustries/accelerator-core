import {
  ActionTypes,
} from '../ActionTypes';
import {
  IPassageTimeAction,
} from '../IPassageTimeAction';

export function createPassageTimeAction(): IPassageTimeAction {
  return Object.freeze({
    type: ActionTypes.PassageTime,
  }) as IPassageTimeAction;
}
