import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IPassageReadyAction extends IAction {
  readonly type: ActionTypes.PassageReady;
  readonly value: boolean;
}
