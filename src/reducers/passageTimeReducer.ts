import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IPassageTimeAction,
} from '../actions/IPassageTimeAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryStateLoadAction,
} from '../actions/IStoryStateLoadAction';

/* This mostly exists to ensure that traveling to a passage from itself is
 * always treated as a new, distinct state. */
export const passageTimeReducer = (
  previousState = 0,
  action: IPassageNavigationAction |
    IPassageTimeAction |
    IStoryResetAction |
    IStoryStateLoadAction,
) => {
  if (action.type === ActionTypes.PassageNavigation ||
      action.type === ActionTypes.PassageTime)
  {
    return previousState + 1;
  } else if (action.type === ActionTypes.StoryStateLoad) {
    return action.value.engineHistory.present.passageTimeCounter;
  } else if (action.type === ActionTypes.StoryReset) {
    return 0;
  }

  return previousState;
};
