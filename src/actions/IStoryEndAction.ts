import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IStoryEndAction extends IAction {
  readonly type: ActionTypes.StoryEnd;
  readonly value: null;
}
