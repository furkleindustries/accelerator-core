import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryResetAction,
} from '../IStoryResetAction';

export function createStoryResetAction(): IStoryResetAction {
  return Object.freeze({ type: ActionTypes.StoryReset }) as IStoryResetAction;
}
