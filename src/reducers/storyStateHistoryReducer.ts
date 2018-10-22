import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';
import {
  TStoryStateHistory,
} from '../state/TStoryStateHistory';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';

export const strings = {
  INDEX_INVALID:
    'The index provided was not 0 or a positive integer.',

  INDEX_NOT_IN_STORY_STATE:
    'The index provided to did not exist in the story state.',
}

const combineState = (oldState: IStoryStateInstance, newState: IStoryStateInstance) => (
  Object.assign({}, oldState, newState)
);

export const storyStateHistoryReducer = (previousStateHistory: TStoryStateHistory = [], action: IStoryStateAction) => {
  if (action.type === ActionTypes.StoryStateUpdate && 'value' in action) {
    const value = action.value as IStoryStateInstance;
    const newStateInstance = combineState(
      previousStateHistory[0],
      value,
    );

    return [ newStateInstance, ].concat(previousStateHistory.slice(1));
  } else if (action.type === ActionTypes.StoryStateNew) {
    return [
      /* Clone the previous history. */
      Object.assign({}, previousStateHistory[0]),
    ].concat(previousStateHistory);
  } else if (action.type === ActionTypes.StoryRewind) {
    if (action.index! < 0 && action.index! % 1 !== 0) {
      throw new Error(strings.INDEX_INVALID);
    }

    const index = action.index as number;

    /* Get the state at the end of the prior passage. This is so the user
     * doesn't rewind to a passage they've already significantly mutated from
     * its starting point. */
    const stateGoingIn = Object.assign({}, previousStateHistory[index - 1]);
    return [
      stateGoingIn,
    ].concat(previousStateHistory.slice(0, index));
  }

  return previousStateHistory;
};

export default storyStateHistoryReducer;
