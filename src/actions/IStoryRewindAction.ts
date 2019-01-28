import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IStoryRewindAction extends IAction {
  readonly type: ActionTypes.StoryRewind;
}
