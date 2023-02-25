import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IPassageReadyAction,
} from '../actions/IPassageReadyAction';
import {
  IStoryRequiresFullRerenderAction,
} from '../actions/IStoryRequiresFullRerenderAction';
import {
  IStoryStateLoadAction,
} from '../actions/IStoryStateLoadAction';

export const passageReadyReducer = (
  previousState = false,
  action: IPassageReadyAction |
    IPassageNavigationAction |
      IStoryRequiresFullRerenderAction |
      IStoryStateLoadAction,
) => {
  if (action.type === ActionTypes.PassageReady) {
    return action.value;
  } else if (action.type === ActionTypes.PassageNavigation ||
    action.type === ActionTypes.StoryRequiresFullRerender ||
    action.type === ActionTypes.StoryStateLoad)
  {
    return false;
  }

  return previousState;
};
