import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IStoryResetAction extends IAction {
  readonly type: ActionTypes.StoryReset;
  readonly value?: undefined;
}
