import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryRewindAction,
} from '../actions/IStoryRewindAction';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';
import {
  IStoryStateNewAction,
} from '../actions/IStoryStateNewAction';
import {
  IStoryStateUpdateAction,
} from '../actions/IStoryStateUpdateAction';
import {
  TStoryStateHistory,
} from '../state/TStoryStateHistory';

export const strings = {
  INDEX_INVALID:
    'The index provided was not 0 or a positive integer.',

  INDEX_NOT_IN_STORY_STATE:
    'The index provided to did not exist in the story state.',
}

const combineState = (oldState: IStoryStateInstance, newState: IStoryStateInstance) => (
  Object.assign({}, oldState, newState)
);

type Actions = IStoryStateNewAction |
               IStoryStateUpdateAction |
               IStoryRewindAction |
               IStoryResetAction;

export const storyStateHistoryReducer = (previousStateHistory: TStoryStateHistory = [], action: Actions) => {
  if (action.type === ActionTypes.StoryStateNew) {
    return [
      /* Clone the previous history. */
      combineState(previousStateHistory[0], {}),
    ].concat(previousStateHistory);
  } else if (action.type === ActionTypes.StoryStateUpdate && 'value' in action) {
    const value = action.value as IStoryStateInstance;
    const newStateInstance = combineState(
      previousStateHistory[0],
      value,
    );

    return [ newStateInstance, ].concat(previousStateHistory.slice(1));
  } else if (action.type === ActionTypes.StoryRewind) {
    if (action.value < 0 && action.value % 1 !== 0) {
      throw new Error(strings.INDEX_INVALID);
    }

    const index = action.value;

    /* Get the state at the end of the prior passage. This is so the user
     * doesn't rewind to a passage they've already significantly mutated from
     * its starting point. */
    const stateGoingIn = Object.assign({}, previousStateHistory[index - 1]);
    return [
      stateGoingIn,
    ].concat(previousStateHistory.slice(0, index));
  } else if (action.type === ActionTypes.StoryReset) {
    /* Return an empty state array with a single empty object for the start
     * passage. */
    return [ {}, ];
  }

  return previousStateHistory;
};
