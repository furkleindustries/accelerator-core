import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';
import {
  IStoryState,
} from '../state/IStoryState';
import {
  Reducer,
} from 'redux';

export const storyStateReducer: Reducer = (previousState: IStoryState = {}, action: IStoryStateAction) => {
  if (action.type === ActionTypes.StoryState && 'value' in action) {
    return action.value;
  }

  return previousState;
};

export default storyStateReducer;
