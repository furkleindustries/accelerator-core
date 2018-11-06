import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IStoryRequiresFullRerenderAction extends IAction {
  readonly type: ActionTypes.StoryRequiresFullRerender;
  readonly value: boolean;
}
