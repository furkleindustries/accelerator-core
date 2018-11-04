import {
  ActionTypes,
} from '../ActionTypes';
import {
  IPassageHistoryInstance,
} from '../../state/IPassageHistoryInstance';
import {
  IPassageHistoryNewAction,
} from '../IPassageHistoryNewAction';

export const createPassageHistoryNewAction = (value: IPassageHistoryInstance): IPassageHistoryNewAction => (
  Object.freeze({
    value,
    type: ActionTypes.PassageHistoryNew,
  }) as IPassageHistoryNewAction
);
