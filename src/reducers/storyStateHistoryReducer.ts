import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';

export const strings = {
};

export function storyStateReducer(
  previousState: IStoryStateInstance = {},
  action: IStoryStateAction,
)
{
  if (action.type === ActionTypes.StoryState) {
    return {
      ...previousState,
      ...action.value,
    };
  }

  return previousState;
};
