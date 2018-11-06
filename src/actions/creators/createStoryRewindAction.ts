import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryRewindAction,
} from '../IStoryRewindAction';

export const createStoryRewindAction = (value: number = 1): IStoryRewindAction => (
  Object.freeze({
    value,
    type: ActionTypes.StoryRewind,
  }) as IStoryRewindAction
);
