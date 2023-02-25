import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryOptionsDialogVisibleAction,
} from '../IStoryOptionsDialogVisibleAction';

export const createStoryOptionsDialogVisibleAction = (value: boolean): IStoryOptionsDialogVisibleAction => (
  Object.freeze({
    type: ActionTypes.StoryOptionsDialogVisible,
    value,
  })
);
