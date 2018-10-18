import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IStartPassageNameAction extends IAction {
  type: ActionTypes.StartPassageName;
  value: string;
}

export default IStartPassageNameAction;
