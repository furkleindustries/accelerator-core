import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStartPassageNameAction,
} from '../IStartPassageNameAction';

export const createStartPassageNameAction = (name: string): IStartPassageNameAction => ({
  type: ActionTypes.StartPassageName,
  value: name,
});
