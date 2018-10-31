import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryRewindAction,
} from '../IStoryRewindAction';

export const createStoryRewindAction = (value: number): IStoryRewindAction => (
  Object.freeze({
    value,
    type: ActionTypes.StoryRewind,
  }) as IStoryRewindAction
);

export default createStoryRewindAction;
