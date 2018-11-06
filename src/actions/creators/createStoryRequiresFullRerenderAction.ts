import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryRequiresFullRerenderAction,
} from '../IStoryRequiresFullRerenderAction';

export const createStoryRequiresFullRerenderAction = (value: boolean): IStoryRequiresFullRerenderAction => (
  Object.freeze({
    type: ActionTypes.StoryRequiresFullRerender,
    value,
  }) as IStoryRequiresFullRerenderAction
);
