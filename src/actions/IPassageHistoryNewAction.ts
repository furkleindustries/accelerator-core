import {
  ActionTypes,
} from './ActionTypes';
import {
  IPassageHistoryInstance,
} from '../state/IPassageHistoryInstance';

export interface IPassageHistoryNewAction {
  type: ActionTypes.PassageHistoryNew;
  value: IPassageHistoryInstance | number;
}

export default IPassageHistoryNewAction;
