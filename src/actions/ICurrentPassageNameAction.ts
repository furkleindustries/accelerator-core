import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface ICurrentPassageNameAction extends IAction {
  readonly type: ActionTypes.CurrentPassageName;
  readonly value: string;
}

export default ICurrentPassageNameAction;
