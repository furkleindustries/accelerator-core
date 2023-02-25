import {
  ActionTypes,
} from './ActionTypes';

export interface IStoryOptionsDialogVisibleAction {
  readonly type: ActionTypes.StoryOptionsDialogVisible;
  readonly value: boolean;
}
