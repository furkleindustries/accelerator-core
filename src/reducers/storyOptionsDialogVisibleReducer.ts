import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryOptionsDialogVisibleAction,
} from '../actions/IStoryOptionsDialogVisibleAction';

export const storyOptionsDialogVisibleReducer = (
  previousValue = false,
  action: IStoryOptionsDialogVisibleAction,
) => {
  if (action.type === ActionTypes.StoryOptionsDialogVisible) {
    return action.value;
  }

  return previousValue;
};
