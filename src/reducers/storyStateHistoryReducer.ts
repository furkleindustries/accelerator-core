import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';

export function storyStateReducer(
  previousState: IStoryStateInstance = {},
  action: IStoryStateAction | IStoryResetAction,
)
{
  if (action.type === ActionTypes.StoryState) {
    return {
      ...previousState,
      ...action.value,
    };
  } else if (action.type === ActionTypes.StoryReset) {
    return {};
  }

  return previousState;
}
