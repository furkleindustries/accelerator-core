import {
  ActionTypes,
} from './ActionTypes';
import {
  IPassageHistoryInstance,
} from '../state/IPassageHistoryInstance';

export interface IPassageHistoryNewAction {
  readonly type: ActionTypes.PassageHistoryNew;
  readonly value: IPassageHistoryInstance | number;
}

export default IPassageHistoryNewAction;
