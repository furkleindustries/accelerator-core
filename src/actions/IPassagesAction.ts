import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';
import {
  IPassagesMap,
} from '../passages/IPassagesMap';

export interface IPassagesAction extends IAction {
  type: ActionTypes.Passages;
  value: IPassagesMap;
}

export default IPassagesAction;
