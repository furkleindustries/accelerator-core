import {
  ActionTypes,
} from '../ActionTypes';
import {
  IPassageHistoryAction,
} from '../IPassageHistoryAction';
import {
  IPassageHistoryInstance,
} from '../../state/IPassageHistoryInstance';

type PassageHistoryTypes = ActionTypes.PassageHistoryNew |
                           ActionTypes.StoryRewind;

/* The Partial type doesn't actually change anything, as IStoryState is a very
 * simple type, but it indicates the purpose: the value argument is an object
 * to be merged into the storyState object, not a replacement. */
export const createPassageHistoryAction = (type: PassageHistoryTypes, value: IPassageHistoryInstance | number): IPassageHistoryAction => {
  const obj: Partial<IPassageHistoryAction> = {
    type,
  };

  if (value || (value >= 0 && value % 1 === 0)) {
    obj.value = value;
  }

  return obj as IPassageHistoryAction;
};

export default createPassageHistoryAction;
