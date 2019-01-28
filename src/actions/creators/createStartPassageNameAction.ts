import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStartPassageNameAction,
} from '../IStartPassageNameAction';

export function createStartPassageNameAction(name: string): IStartPassageNameAction {
  return Object.freeze({
    type: ActionTypes.StartPassageName,
    value: name,
  }) as IStartPassageNameAction;
}
