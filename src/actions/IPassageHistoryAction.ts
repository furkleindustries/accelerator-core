import {
  ActionTypes,
} from './ActionTypes';
import {
  IPassageHistoryInstance,
} from '../state/IPassageHistoryInstance';

export interface IPassageHistoryAction {
  type: ActionTypes.PassageHistoryNew | ActionTypes.StoryRewind;
  value: IPassageHistoryInstance | number;
}

export default IPassageHistoryAction;
