import {
  ActionTypes,
} from '../ActionTypes';
import {
  IPassageHistoryInstance,
} from '../../state/IPassageHistoryInstance';
import {
  IPassageHistoryNewAction,
} from '../IPassageHistoryNewAction';

/* The Partial type doesn't actually change anything, as IStoryState is a very
 * simple type, but it indicates the purpose: the value argument is an object
 * to be merged into the storyState object, not a replacement. */
export const createPassageHistoryNewAction = (value: IPassageHistoryInstance): IPassageHistoryNewAction => (
  Object.freeze({
    value,
    type: ActionTypes.PassageHistoryNew,
  }) as IPassageHistoryNewAction
);

export default createPassageHistoryNewAction;
