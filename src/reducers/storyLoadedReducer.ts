import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryLoadedAction,
} from '../actions/IStoryLoadedAction';

export const storyLoadedReducer = (
  previousState = false,
  action: IStoryLoadedAction,
) => {
  if (action.type === ActionTypes.StoryLoaded) {
    return action.value;
  }

  return previousState;
};
