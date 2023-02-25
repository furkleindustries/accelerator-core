import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryEndAction,
} from '../actions/IStoryEndAction';

export const storyEndedReducer = (
  previousState = false,
  action: IStoryEndAction,
) => {
  if (action.type === ActionTypes.StoryEnd) {
    return true;
  }

  return previousState;
};
