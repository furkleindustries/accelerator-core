import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface ICurrentPassageNameAction extends IAction {
  type: ActionTypes.CurrentPassageName;
  value: string;
}
