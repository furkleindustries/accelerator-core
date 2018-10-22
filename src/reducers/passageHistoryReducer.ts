import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IPassageHistoryAction,
} from '../actions/IPassageHistoryAction';
import {
  IPassageHistoryInstance,
} from '../state/IPassageHistoryInstance';
import {
  TPassageHistory,
} from '../state/TPassageHistory';

export const strings = {
  INDEX_NOT_IN_PASSAGE_HISTORY:
    'The provided index did not exist in the passage history.',
};

export const passageHistoryReducer = (previousState: TPassageHistory = [], action: IPassageHistoryAction) => {
  if (action.type === ActionTypes.PassageHistoryNew && action.value)  {
    return [ action.value as IPassageHistoryInstance, ].concat(previousState);
  } else if (action.type === ActionTypes.StoryRewind &&
             (action.value >= 0 && (action.value as number) % 1 === 0))
  {
    const index = action.value as number;
    if (!(index in previousState)) {
      throw new Error(strings.INDEX_NOT_IN_PASSAGE_HISTORY);
    }

    return previousState.slice(index);
  }

  return previousState;
};

export default passageHistoryReducer;
