import {
  ActionTypes,
} from '../ActionTypes';
import {
  ICurrentPassageNameAction,
} from '../ICurrentPassageNameAction';

export const createCurrentPassageNameAction = (name: string): ICurrentPassageNameAction => ({
  type: ActionTypes.CurrentPassageName,
  value: name,
});
