import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IStartPassageNameAction extends IAction {
  readonly type: ActionTypes.StartPassageName;
  readonly value: string;
}
