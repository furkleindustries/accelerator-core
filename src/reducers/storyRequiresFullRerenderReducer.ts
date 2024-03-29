import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryRequiresFullRerenderAction,
} from '../actions/IStoryRequiresFullRerenderAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';

export const storyRequiresFullRerenderReducer = (
  previousValue = false,
  action: IStoryResetAction | IStoryRequiresFullRerenderAction,
) => {
  if (action.type === ActionTypes.StoryReset) {
    return true;
  } else if (action.type === ActionTypes.StoryRequiresFullRerender) {
    return action.value as boolean;
  }

  return previousValue;
};
