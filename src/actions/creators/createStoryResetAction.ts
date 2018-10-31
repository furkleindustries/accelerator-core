import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryResetAction,
} from '../IStoryResetAction';

export const createStoryResetAction = (): IStoryResetAction => (
  Object.freeze({
    type: ActionTypes.StoryReset,
  }) as IStoryResetAction
);

export default createStoryResetAction;
