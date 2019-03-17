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
  IStoryStateFrame,
} from '../state/IStoryStateFrame';

export function storyStateReducer(
  previousState: IStoryStateFrame = {},
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
