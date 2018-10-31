import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IPassageHistoryNewAction,
} from '../actions/IPassageHistoryNewAction';
import {
  IPassageHistoryInstance,
} from '../state/IPassageHistoryInstance';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryRewindAction,
} from '../actions/IStoryRewindAction';
import {
  TPassageHistory,
} from '../state/TPassageHistory';

export const strings = {
  INDEX_NOT_IN_PASSAGE_HISTORY:
    'The provided index did not exist in the passage history.',
};

type Actions = IPassageHistoryNewAction |
               IStoryRewindAction |
               IStoryResetAction;

export const passageHistoryReducer = (previousState: TPassageHistory = [], action: Actions) => {
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
  } else if (action.type === ActionTypes.StoryReset) {
    return [ previousState[0], ];
  }

  return previousState;
};

export default passageHistoryReducer;
