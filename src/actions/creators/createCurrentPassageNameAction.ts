import {
  ActionTypes,
} from '../ActionTypes';
import {
  ICurrentPassageNameAction,
} from '../ICurrentPassageNameAction';

export function createCurrentPassageNameAction(name: string): ICurrentPassageNameAction {
  return Object.freeze({
    type: ActionTypes.CurrentPassageName,
    value: name,
  }) as ICurrentPassageNameAction;
}
