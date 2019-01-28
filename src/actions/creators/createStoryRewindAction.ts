import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryRewindAction,
} from '../IStoryRewindAction';

export function createStoryRewindAction(): IStoryRewindAction {
  return Object.freeze({ type: ActionTypes.StoryRewind }) as IStoryRewindAction;
}
