import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IPassageTimeAction extends IAction {
  type: ActionTypes.PassageTime;
}
